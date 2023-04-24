import { BadRequestException, Injectable } from '@nestjs/common';
import { StoredFile } from '@libs/entities/entities/StoredFile';
import { Options } from '@server/modules/upload/upload.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import * as Minio from 'minio';
import * as path from 'path';
import 'multer';
import { downloadFileFromUrl, getFileHash } from '@libs/utils/files';
import { MinioFolder } from './minio/minio.config';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(StoredFile)
    private readonly storedFileRepository: EntityRepository<StoredFile>
  ) {}

  private getClient(): Minio.Client {
    return new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_API_PORT),
      useSSL: process.env.NODE_ENV === 'production',
      accessKey: process.env.MINIO_ACCESSKEY,
      secretKey: process.env.MINIO_SECRETKEY,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    options: Options = {}
  ): Promise<StoredFile> {
    const client = this.getClient();
    const ext = path.extname(file.originalname);
    if (!ext) {
      throw new BadRequestException('File ext is not valid.');
    }
    const fileHash = `${getFileHash()}${ext}`;
    const key = [options.folderPath, fileHash].filter((v) => v).join('/');
    await client.putObject(process.env.MINIO_BUCKET, key, file.buffer);
    const filePath = `${process.env.MINIO_PROTOCOL}://${
      process.env.MINIO_ENDPOINT
    }${process.env.MINIO_API_PORT ? `:${process.env.MINIO_API_PORT}` : ''}/${
      process.env.MINIO_BUCKET
    }/${key}`;
    const storedFile = this.storedFileRepository.create({
      name: file.originalname,
      path: filePath,
      hash: fileHash,
      key: fileHash,
    });
    await this.storedFileRepository.persistAndFlush(storedFile);
    return storedFile;
  }

  async removeFile(storedFile: StoredFile): Promise<void> {
    const client = this.getClient();
    await client.removeObject(process.env.MINIO_BUCKET, storedFile.key);
    await this.storedFileRepository.removeAndFlush(storedFile);
  }

  async uploadAvatar(url: string, options: Options = {}) {
    const file = await downloadFileFromUrl(url);
    const client = this.getClient();
    const hash = getFileHash();
    const key = `${MinioFolder.Avatar}/${hash}.png`;
    await client.putObject(process.env.MINIO_BUCKET, key, file);
    const filePath = `${process.env.MINIO_PROTOCOL}://${
      process.env.MINIO_ENDPOINT
    }${process.env.MINIO_API_PORT ? `:${process.env.MINIO_API_PORT}` : ''}/${
      process.env.MINIO_BUCKET
    }/${key}`;
    const storedFile = this.storedFileRepository.create({
      name: hash,
      path: filePath,
      hash: hash,
      key: key,
    });
    try {
      await this.storedFileRepository.persistAndFlush(storedFile);
    } catch (error) {
      console.log(error);
    }
    return storedFile;
  }
}
