import { TypeLesson } from './../../../../../../libs/constants/src/entities/Lesson';
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
import { User } from '@libs/entities/entities/User';
import { Course } from '@libs/entities/entities/Course';

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
    await this.em.begin();
    try {
      const { video, link } = data;
      const section = await this.em
        .getRepository(Section)
        .findOneOrFail({ id: data.section_id }, { populate: ['course'] });
      await this.IsOwnerCourse(this.request.user, section.course);
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
        time: data.time,
        created_by: this.request.user.id,
        updated_by: this.request.user.id,
      });
      if (data.type == TypeLesson.UPLOAD) {
        if (video) {
          const videoStored = await this.uploadService.uploadFile(video, {
            folderPath: MinioFolder.Lessons,
          });
          lesson.video_id = videoStored.id;
          lesson.type = TypeLesson.UPLOAD;
        } else {
          throw new BadRequestException('Video chưa được tải');
        }
      }
      if (data.type == TypeLesson.YOUTUBE) {
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
          lesson.type = TypeLesson.YOUTUBE;
        } else {
          throw new BadRequestException('Link chưa cập nhật');
        }
      }
      await this.lessonRepository.persistAndFlush(lesson);
      await this.em.commit();
      return await this.lessonRepository.findOne(lesson.id, {
        populate: ['video'],
      });
    } catch (error) {
      await this.em.rollback();
    }
  }

  async update(id: number, data: UpdateLessonDto): Promise<Lesson> {
    console.log(data);
    await this.em.begin();
    try {
      const lesson = await this.lessonRepository.findOneOrFail(
        {
          id,
          created_by: this.request.user.id,
        },
        { populate: ['video', 'section.course'] }
      );
      await this.IsOwnerCourse(this.request.user, lesson.section.course);
      let videoStored: StoredFile;
      let oldVideo: StoredFile;
      const { video, link, type, time, ...rest } = data;
      wrap(lesson).assign({
        ...rest,
      });
      if (video || link) {
        if (type == TypeLesson.UPLOAD) {
          if (video) {
            oldVideo = lesson.video;
            videoStored = await this.uploadService.uploadFile(video, {
              folderPath: MinioFolder.Lessons,
            });
            lesson.video_id = videoStored.id;
            lesson.time = time;
            if (lesson.type == TypeLesson.UPLOAD) {
              await this.uploadService.removeFile(oldVideo);
            }
          }
        }
        if (type == TypeLesson.YOUTUBE) {
          if (link && link !== lesson.video.path) {
            oldVideo = lesson.video;
            videoStored = this.storedFileRepository.create({
              name: data.title,
              hash: link,
              key: link,
              path: link,
              created_by: this.request.user.id,
              updated_by: this.request.user.id,
            });
            await this.storedFileRepository.persistAndFlush(videoStored);
            lesson.time = time;
            lesson.video_id = videoStored.id;
            if (lesson.type == TypeLesson.UPLOAD) {
              await this.uploadService.removeFile(oldVideo);
            }
          }
        }
        lesson.type = type;
        if (type == TypeLesson.YOUTUBE) {
          lesson.video = videoStored;
          await this.lessonRepository.persistAndFlush(lesson);
        } else {
          await this.lessonRepository.persistAndFlush(lesson);
          lesson.video = videoStored;
        }
        await this.storedFileRepository.nativeDelete(oldVideo);
      } else {
        await this.lessonRepository.persistAndFlush(lesson);
      }
      await this.em.commit();
      return lesson;
    } catch (error) {
      console.log(error);
      await this.em.rollback();
    }
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

  async IsOwnerCourse(user: User, course: Course) {
    if (user.id == course.administrator_id) {
      return true;
    } else {
      throw new BadRequestException('Bạn không có quyền sở hữu khóa học này');
    }
  }
}
