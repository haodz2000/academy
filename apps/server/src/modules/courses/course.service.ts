import { AbilityFactory } from './../auth/ability/ability.factory';
import { StatusCourseSubscribe } from '@libs/constants/entities/CourseSubscribe';
import { CourseSubscribe } from '@libs/entities/entities/CourseSubscribe';
import { UploadService } from './../upload/upload.service';
import { Course } from '@libs/entities/entities/Course';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { CourseCreateDto } from './dtos/course-create.dto';
import { createSlug } from '@server/utils/slug';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { StatusCourse } from '@libs/constants/entities/Course';
import { CourseUpdateDto } from './dtos/course-update.dto';
import { ForbiddenError } from '@casl/ability';
import { IdAction } from '@libs/constants/abilities';
import { wrap } from '@mikro-orm/core';
import { DeleteResponse } from './responses/delete.response';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @InjectRepository(CourseSubscribe)
    private readonly courseSubscribeRepository: EntityRepository<CourseSubscribe>,
    private readonly uploadService: UploadService,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory
  ) {}

  async list(): Promise<Course[]> {
    return await this.courseRepository.findAll({
      populate: ['cover', 'administrator'],
    });
  }

  async findOne(slug: Course['slug']): Promise<Course> {
    return await this.courseRepository.findOneOrFail(
      { slug: slug },
      {
        populate: [
          'cover',
          'administrator.avatar',
          'sections.lessons',
          'topics',
          'subscribers',
        ],
      }
    );
  }

  async create(data: CourseCreateDto): Promise<Course> {
    await this.em.begin();
    try {
      const coverStoredFile = await this.uploadService.uploadFile(data.cover, {
        folderPath: 'courses',
      });
      const course = this.courseRepository.create({
        name: data.name,
        slug: createSlug(data.name),
        administrator_id: this.request.user.id,
        created_by: this.request.user.id,
        updated_by: this.request.user.id,
        status: StatusCourse.Pending,
        topics: [...data.topicIds],
        cover_id: coverStoredFile.id,
        description: data.description,
      });
      await this.courseRepository.persistAndFlush(course);
      const newSubscribe = this.courseSubscribeRepository.create({
        course_id: course.id,
        subscriber_id: this.request.user.id,
        status: StatusCourseSubscribe.Pending,
        created_by: this.request.user.id,
        updated_by: this.request.user.id,
      });
      await this.courseSubscribeRepository.persistAndFlush(newSubscribe);
      await this.em.commit();
      return course;
    } catch (error) {
      await this.em.rollback();
    }
  }

  async update(id: Course['id'], data: CourseUpdateDto): Promise<Course> {
    this.em.begin();
    try {
      const course = await this.courseRepository.findOneOrFail(id, {
        populate: ['cover', 'administrator'],
      });
      const ability = this.ability.defineAbility(this.request.user);
      ForbiddenError.from(ability)
        .setMessage('Unauthorize update this course')
        .throwUnlessCan(IdAction.Update, course);
      const { cover, ...updateData } = data;
      wrap(course).assign({
        ...updateData,
      });
      await this.courseRepository.persistAndFlush(course);
      if (cover) {
        const newCover = await this.uploadService.uploadFile(cover, {
          folderPath: 'courses',
        });
        course.cover_id = newCover.id;
        await this.courseRepository.persistAndFlush(course);
      }
      this.em.commit();
      return await this.courseRepository.findOne(id, {
        populate: ['cover', 'administrator'],
      });
    } catch (error) {
      this.em.rollback();
    }
  }

  async delete(id: Course['id']): Promise<DeleteResponse> {
    await this.em.begin();
    try {
      const course = await this.courseRepository.findOneOrFail(id, {
        populate: ['cover'],
      });
      const ability = this.ability.defineAbility(this.request.user);
      ForbiddenError.from(ability)
        .setMessage('Unauthorize delete this course')
        .throwUnlessCan(IdAction.Delete, course);
      const cover = course.cover;
      await this.courseRepository.removeAndFlush(course);
      await this.uploadService.removeFile(cover);
      this.em.commit();
      return { id };
    } catch (error) {
      this.em.rollback();
    }
  }
}
