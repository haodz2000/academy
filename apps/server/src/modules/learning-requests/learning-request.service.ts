import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LearningRequest } from '@libs/entities/entities/LearningRequest';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AbilityFactory } from '../auth/ability/ability.factory';
import { FilterQuery } from '@mikro-orm/core';
import { Pagination } from '@libs/utils/responses';
import { LearningRequestFilterDto } from './dtos/learning-request-filter.dto';
import { LearningRequestDto } from './dtos/learning-request.dto';
import { CourseStudent } from '@libs/entities/entities/CourseStudent';
import { StatusLearningRequest } from '@libs/constants/entities/LearningRequest';
import { StatusCourseStudent } from '@libs/constants/entities/CourseStudent';

@Injectable()
export class LearningRequestService {
  constructor(
    @InjectRepository(LearningRequest)
    private readonly learningRequestRepository: EntityRepository<LearningRequest>,
    @InjectRepository(CourseStudent)
    private readonly courseStudentRepository: EntityRepository<CourseStudent>,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory
  ) {}

  async list(
    option: LearningRequestFilterDto
  ): Promise<{ data: LearningRequest[]; pagination: Pagination }> {
    const where: FilterQuery<LearningRequest> = {};
    const limit = 15;
    if (option.status) {
      where.$and = [
        {
          status: 1,
        },
        {
          $or: [
            { course: { administrator_id: this.request.user.id } },
            { requester_id: this.request.user.id },
          ],
        },
      ];
    }
    const [data, count] = await this.learningRequestRepository.findAndCount(
      where,
      {
        populate: [
          'course.administrator',
          'course.creator',
          'requester.avatar',
          'requester.role',
        ],
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

  async createRequest(data: LearningRequestDto): Promise<LearningRequest> {
    const oldRequest = await this.learningRequestRepository.findOne({
      course_id: data.course_id,
      requester_id: this.request.user.id,
      $or: [
        { status: StatusLearningRequest.Pending },
        {
          status: StatusLearningRequest.Approve,
        },
      ],
    });
    if (oldRequest) {
      throw new BadRequestException('Khóa học đã được đăng kí');
    }
    const learningRequest = this.learningRequestRepository.create({
      course_id: data.course_id,
      requester_id: this.request.user.id,
      status: StatusLearningRequest.Pending,
      created_by: this.request.user.id,
      updated_by: this.request.user.id,
    });
    await this.learningRequestRepository.persistAndFlush(learningRequest);
    return await this.learningRequestRepository.findOne(
      { id: learningRequest.id },
      { populate: ['requester.avatar', 'course.cover'] }
    );
  }

  async accept(id: string): Promise<LearningRequest> {
    await this.em.begin();
    try {
      const learningRequest =
        await this.learningRequestRepository.findOneOrFail(id, {
          populate: ['course.cover', 'requester.avatar'],
        });
      learningRequest.status = StatusLearningRequest.Approve;
      await this.learningRequestRepository.persistAndFlush(learningRequest);
      const courseStudent = this.courseStudentRepository.create({
        student_id: learningRequest.requester.id,
        course_id: learningRequest.course.id,
        status: StatusCourseStudent.Approve,
        created_by: this.request.user.id,
        updated_by: this.request.user.id,
      });
      await this.courseStudentRepository.persistAndFlush(courseStudent);
      await this.em.commit();
      return learningRequest;
    } catch (error) {
      console.log('error', error);
      await this.em.rollback();
    }
  }

  async reject(id: string): Promise<LearningRequest> {
    const learningRequest = await this.learningRequestRepository.findOneOrFail(
      id,
      {
        populate: ['course.cover', 'requester.avatar'],
      }
    );
    learningRequest.status = StatusLearningRequest.Reject;
    await this.learningRequestRepository.persistAndFlush(learningRequest);
    return learningRequest;
  }
}
