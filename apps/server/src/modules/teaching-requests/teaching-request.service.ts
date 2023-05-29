import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { TeachingRequestDto } from './dtos/teaching-request.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TeachingRequest } from '@libs/entities/entities/TeachingRequest';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AbilityFactory } from '../auth/ability/ability.factory';
import { StatusTeachingRequest } from '@libs/constants/entities/TeachingRequest';
import { CourseTeacher } from '@libs/entities/entities/CourseTeacher';
import { Course } from '@libs/entities/entities/Course';
import { StatusCourseTeacher } from '@libs/constants/entities/CourseTeacher';
import { StatusCourse } from '@libs/constants/entities/Course';
import { TeachingRequestFilterDto } from './dtos/teaching-request-filter.dto';
import { FilterQuery } from '@mikro-orm/core';
import { Pagination } from '@libs/utils/responses';
import { ForbiddenError } from '@casl/ability';
import { IdAction } from '@libs/constants/abilities';
import { RoleType } from '@libs/constants/entities/Role';

@Injectable()
export class TeachingRequestService {
  constructor(
    @InjectRepository(TeachingRequest)
    private readonly teachingRequestRepository: EntityRepository<TeachingRequest>,
    @InjectRepository(CourseTeacher)
    private readonly courseTeacherRepository: EntityRepository<CourseTeacher>,
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory
  ) {}

  async list(
    option: TeachingRequestFilterDto
  ): Promise<{ data: TeachingRequest[]; pagination: Pagination }> {
    const where: FilterQuery<TeachingRequest> = {};
    const limit = 15;
    if (option.status) {
      where.status = StatusTeachingRequest.Pending;
    }
    if (this.request.user.role.type == RoleType.User) {
      where.requester_id == this.request.user.id;
    }
    const [data, count] = await this.teachingRequestRepository.findAndCount(
      where,
      {
        populate: ['course.cover', 'requester.avatar'],
        limit: limit,
        offset: (option.page - 1) * 15 || 0,
      }
    );
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

  async createRequest(data: TeachingRequestDto): Promise<TeachingRequest> {
    const course = await this.courseRepository.findOneOrFail(data.course_id);
    const ability = this.ability.defineAbility(this.request.user);
    ForbiddenError.from(ability)
      .setMessage('Bạn không sở hữu khóa học này')
      .throwUnlessCan(IdAction.Request, course);
    const oldRequest = await this.teachingRequestRepository.findOne({
      course_id: data.course_id,
      $or: [
        { status: StatusTeachingRequest.Pending },
        {
          status: StatusTeachingRequest.Approve,
        },
      ],
    });
    if (oldRequest) {
      throw new BadRequestException('Khóa học đã được đăng kí');
    }
    const teachingRequest = this.teachingRequestRepository.create({
      course_id: data.course_id,
      requester_id: this.request.user.id,
      status: StatusTeachingRequest.Pending,
      created_by: this.request.user.id,
      updated_by: this.request.user.id,
    });
    await this.teachingRequestRepository.persistAndFlush(teachingRequest);
    return await this.teachingRequestRepository.findOne(
      { id: teachingRequest.id },
      { populate: ['requester.avatar', 'course.cover'] }
    );
  }

  async accept(id: string): Promise<TeachingRequest> {
    await this.em.begin();
    try {
      const teachingRequest =
        await this.teachingRequestRepository.findOneOrFail(id, {
          populate: ['course', 'requester'],
        });
      teachingRequest.status = StatusTeachingRequest.Approve;
      await this.teachingRequestRepository.persistAndFlush(teachingRequest);
      const courseTeacher = this.courseTeacherRepository.create({
        teacher_id: teachingRequest.requester_id,
        course_id: teachingRequest.course_id,
        status: StatusCourseTeacher.Approve,
        created_by: this.request.user.id,
        updated_by: this.request.user.id,
      });
      await this.courseTeacherRepository.persistAndFlush(courseTeacher);
      const course = await this.courseRepository.findOneOrFail({
        id: teachingRequest.course_id,
      });
      course.status = StatusCourse.Approved;
      await this.courseRepository.persistAndFlush(course);
      await this.em.commit();
      return teachingRequest;
    } catch (error) {
      await this.em.rollback();
    }
  }

  async reject(id: string): Promise<TeachingRequest> {
    const teachingRequest = await this.teachingRequestRepository.findOneOrFail(
      id,
      {
        populate: ['course.cover', 'requester.avatar'],
      }
    );
    teachingRequest.status = StatusTeachingRequest.Reject;
    await this.teachingRequestRepository.persistAndFlush(teachingRequest);
    return teachingRequest;
  }
}
