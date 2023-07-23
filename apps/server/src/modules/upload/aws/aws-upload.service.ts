import { StoredFile } from '@libs/entities/entities/StoredFile';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Options } from '@server/modules/upload/upload.interface';
import { v4 as uuid } from 'uuid';
import { downloadFileFromUrl, getFileHash } from '@libs/utils/files';

@Injectable()
export class AwsUploadService {
  constructor(
    @InjectRepository(StoredFile)
    private readonly storedFileRepository: EntityRepository<StoredFile>
  ) {}
  s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile(file: Express.Multer.File, options: Options = {}) {
    try {
      const fileUpload = await this.s3
        .upload({
          Bucket: process.env.BUCKET_NAME,
          Body: file.buffer,
          Key: `${uuid()}-${file.originalname}`,
          ACL: 'public-read',
        })
        .promise();

      const storedFile = this.storedFileRepository.create({
        name: file.originalname,
        path: fileUpload.Location,
        hash: fileUpload.Key,
        key: fileUpload.Key,
      });

      await this.storedFileRepository.persistAndFlush(storedFile);
      return storedFile;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removeFile(file: StoredFile) {
    try {
      await this.s3
        .deleteObject({
          Key: file.key,
          Bucket: process.env.BUCKET_NAME,
        })
        .promise();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadAvatar(url: string, options: Options = {}) {
    const file = await downloadFileFromUrl(url);
    const hash = getFileHash();
    const avatar = await this.s3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Body: file,
        Key: `${uuid()}-${hash}`,
        ACL: 'public-read',
      })
      .promise();

    const storedFile = this.storedFileRepository.create({
      name: avatar.Key,
      path: avatar.Location,
      hash: hash,
      key: avatar.Key,
    });
    try {
      await this.storedFileRepository.persistAndFlush(storedFile);
    } catch (error) {
      console.log(error);
    }
    return storedFile;
  }
}
