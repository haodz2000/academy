import { AbilityFactory } from './../auth/ability/ability.factory';
import { UploadService } from './../upload/upload.service';
import { Course } from '@libs/entities/entities/Course';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { CourseCreateDto } from './dtos/course-create.dto';
import { createSlug } from '@server/utils/slug';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { StatusCourse, TypeQueryCourse } from '@libs/constants/entities/Course';
import { CourseUpdateDto } from './dtos/course-update.dto';
import { ForbiddenError } from '@casl/ability';
import { IdAction } from '@libs/constants/abilities';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { DeleteResponse } from './responses/delete.response';
import { CourseFilterDto } from './dtos/course-filter.dto';
import { Pagination } from '@libs/utils/responses';
import { RoleType } from '@libs/constants/entities/Role';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    private readonly uploadService: UploadService,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory
  ) {}

  async list(
    option: CourseFilterDto
  ): Promise<{ data: Course[]; pagination: Pagination }> {
    const where: FilterQuery<Course> = {};
    const limit = 15;
    if (option) {
      if (option.type == TypeQueryCourse.Show) {
        where.$or = [
          {
            teaching_requests: { status: option.status },
          },
          {
            status: option.status,
          },
        ];
      }
      if (option.type == TypeQueryCourse.Manage) {
        if (this.request.user.role.type == RoleType.User) {
          where.administrator_id = this.request.user.id;
        }
      }
    }
    const [data, count] = await this.courseRepository.findAndCount(where, {
      populate: ['cover', 'administrator.avatar'],
      limit: limit,
      offset: (option.page - 1) * limit || 0,
    });
    return {
      data: data,
      pagination: {
        limit: limit,
        total: count,
        lastPage: Math.ceil(count / limit),
        page: 1,
      },
    };
  }

  async findCourseLearnings(): Promise<{
    data: Course[];
    pagination: Pagination;
  }> {
    const where: FilterQuery<Course> = {};
    where.$and = [
      {
        course_students: {
          student_id: this.request.user.id,
        },
      },
      {
        status: StatusCourse.Approved,
      },
    ];
    const limit = 15;
    const [data, count] = await this.courseRepository.findAndCount(where, {
      populate: [
        'cover',
        'administrator.avatar',
        'sections.lessons',
        'topics',
        'students.avatar',
      ],
      limit: limit,
    });
    return {
      data: data,
      pagination: {
        limit: limit,
        total: count,
        lastPage: Math.ceil(count / limit),
        page: 1,
      },
    };
  }

  async findOne(slug: Course['slug']): Promise<Course> {
    return await this.courseRepository.findOneOrFail(
      {
        slug: slug,
      },
      {
        populate: [
          'cover',
          'administrator.avatar',
          'sections.lessons.video',
          'topics',
          'students.avatar',
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
      const ids = data.topics_ids[0]
        .toString()
        .split(',')
        .map((i) => Number(i));
      const course = this.courseRepository.create({
        name: data.name,
        slug: createSlug(data.name),
        administrator_id: this.request.user.id,
        created_by: this.request.user.id,
        updated_by: this.request.user.id,
        status: StatusCourse.Pending,
        topics: ids,
        cover_id: coverStoredFile.id,
        description: data.description,
      });
      await this.courseRepository.persistAndFlush(course);
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
      const { cover, topics_ids, ...updateData } = data;
      const ids = topics_ids[0]
        .toString()
        .split(',')
        .map((i) => Number(i));
      wrap(course).assign({
        ...updateData,
        topics: ids,
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
