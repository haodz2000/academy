import { ForbiddenError } from '@casl/ability';
import { Request } from 'express';
import { Lesson } from '@libs/entities/entities/Lesson';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AbilityFactory } from '@server/modules/auth/ability/ability.factory';
import { Section } from '@libs/entities/entities/Section';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { IdAction } from '@libs/constants/abilities';
import { DeleteResponse } from '../responses/delete.response';
import { UpdateLessonDto } from './dtos/update-lesson.dto';
import { wrap } from '@mikro-orm/core';
import { StoredFile } from '@libs/entities/entities/StoredFile';
import { MinioFolder } from '@server/modules/upload/minio/minio.config';
import { UploadService } from '@server/modules/upload/upload.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: EntityRepository<Lesson>,
    @InjectRepository(StoredFile)
    private readonly storedFileRepository: EntityRepository<StoredFile>,
    @Inject(REQUEST) private request: Request,
    private readonly uploadService: UploadService,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory
  ) {}

  async create(data: CreateLessonDto): Promise<Lesson> {
    const { video, link } = data;
    const section = await this.em
      .getRepository(Section)
      .findOneOrFail({ id: data.section_id }, { populate: ['course'] });
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize create lesson this course')
      .throwUnlessCan(IdAction.Insert, section);
    let order = 0;
    const count = await this.lessonRepository.count({
      section: { course_id: section.course_id },
    });
    order = count + 1;
    const lesson = this.lessonRepository.create({
      section_id: data.section_id,
      title: data.title,
      description: data.description,
      order: order,
      created_by: this.request.user.id,
      updated_by: this.request.user.id,
    });
    if (video) {
      const videoStored = await this.uploadService.uploadFile(video, {
        folderPath: MinioFolder.Lessons,
      });
      lesson.video_id = videoStored.id;
    }
    if (link) {
      const videoStored = this.storedFileRepository.create({
        name: data.title,
        hash: link,
        key: link,
        path: link,
        created_by: this.request.user.id,
        updated_by: this.request.user.id,
      });
      await this.storedFileRepository.persistAndFlush(videoStored);
      lesson.video_id = videoStored.id;
    }
    await this.lessonRepository.persistAndFlush(lesson);
    return await this.lessonRepository.findOne(lesson.id, {
      populate: ['video'],
    });
  }

  async update(id: number, data: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneOrFail(
      {
        id,
        created_by: this.request.user.id,
      },
      { populate: ['video'] }
    );
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize create lesson this course')
      .throwUnlessCan(IdAction.Insert, lesson);
    let videoStored: StoredFile;
    let oldVideo: StoredFile;
    const { video, link, ...rest } = data;
    wrap(lesson).assign({
      ...rest,
    });
    if (!(video && link)) {
      oldVideo = lesson.video;
      if (video) {
        videoStored = await this.uploadService.uploadFile(video, {
          folderPath: MinioFolder.Lessons,
        });
      }
      if (link) {
        videoStored = this.storedFileRepository.create({
          name: data.title,
          hash: link,
          key: link,
          path: link,
          created_by: this.request.user.id,
          updated_by: this.request.user.id,
        });
      }
      await this.storedFileRepository.persistAndFlush(videoStored);
      lesson.video_id = videoStored.id;
      if (oldVideo.path.includes('http://localhost:9000/academy')) {
        await this.uploadService.removeFile(oldVideo);
        await this.storedFileRepository.nativeDelete(oldVideo);
      } else {
        await this.storedFileRepository.nativeDelete(oldVideo);
      }
    } else {
      throw new BadRequestException('Data not valid');
    }
    await this.lessonRepository.persistAndFlush(lesson);
    lesson.video = videoStored;
    return lesson;
  }

  async delete(id: Lesson['id']): Promise<DeleteResponse> {
    const lesson = await this.lessonRepository.findOneOrFail(id, {
      populate: ['section.course'],
    });
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Unauthorize delete this section')
      .throwUnlessCan(IdAction.Delete, lesson);
    await this.lessonRepository.removeAndFlush(lesson);
    return { id };
  }
}
