import { NotificationsService } from './../notifications/notifications.service';
import {
  Inject,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
import { Notification } from '@libs/entities/entities/Notification';
import { User } from '@libs/entities/entities/User';
import {
  NotificationPayloadType,
  NotificationRequestPayload,
  NotificationType,
} from '@libs/constants/entities/Notification';
import { RoleType } from '@libs/constants/entities/Role';

@Injectable()
export class LearningRequestService {
  constructor(
    @InjectRepository(LearningRequest)
    private readonly learningRequestRepository: EntityRepository<LearningRequest>,
    @InjectRepository(CourseStudent)
    private readonly courseStudentRepository: EntityRepository<CourseStudent>,
    @InjectRepository(Notification)
    private readonly notificationRepository: EntityRepository<Notification>,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager,
    private readonly ability: AbilityFactory,
    private readonly notificationsService: NotificationsService
  ) {}

  async list(
    option: LearningRequestFilterDto
  ): Promise<{ data: LearningRequest[]; pagination: Pagination }> {
    const where: FilterQuery<LearningRequest> = {};
    const limit = 15;
    if (option.status) {
      where.$and = [
        {
          status: option.status,
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

  async findOne(id: string) {
    const where: FilterQuery<LearningRequest> = {};
    if (this.request.user.role.type !== RoleType.Admin) {
      where.$or = [
        {
          requester_id: this.request.user.id,
        },
        {
          course: { administrator_id: this.request.user.id },
        },
      ];
    }
    where.id = id;
    return await this.learningRequestRepository.findOneOrFail(where, {
      populate: [
        'course.cover',
        'course.administrator.avatar',
        'requester.avatar',
      ],
    });
  }

  async createRequest(data: LearningRequestDto): Promise<LearningRequest> {
    await this.em.begin();
    try {
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
      const teacher = await this.em.findOneOrFail(User, {
        course_teachers: { course_id: data.course_id },
      });
      await this.learningRequestRepository.persistAndFlush(learningRequest);
      await this.notificationsService.sendNotificationToQueue({
        user_id: teacher.id,
        type: NotificationType.Personal,
        payload: {
          type: NotificationPayloadType.LearningRequest,
          data: {
            request_id: learningRequest.id,
          },
          to: teacher.id,
        } as NotificationRequestPayload,
      });
      await this.em.commit();
      return await this.learningRequestRepository.findOne(
        { id: learningRequest.id },
        { populate: ['requester.avatar', 'course.cover'] }
      );
    } catch (error) {
      await this.em.rollback();
      throw new InternalServerErrorException(error);
    }
  }

  async accept(id: string): Promise<LearningRequest> {
    await this.em.begin();
    try {
      const learningRequest =
        await this.learningRequestRepository.findOneOrFail(id, {
          populate: ['course.administrator', 'requester.avatar'],
        });
      if (learningRequest.course.administrator_id !== this.request.user.id) {
        throw new BadRequestException('Bạn không có quyền');
      }
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
      await this.notificationsService.sendNotificationToQueue({
        user_id: learningRequest.requester.id,
        type: NotificationType.Personal,
        payload: {
          type: NotificationPayloadType.LearningRequest,
          data: {
            request_id: learningRequest.id,
          },
          to: learningRequest.requester.id,
        } as NotificationRequestPayload,
      });
      await this.em.commit();
      return learningRequest;
    } catch (error) {
      await this.em.rollback();
      throw new BadRequestException(error);
    }
  }

  async reject(id: string): Promise<LearningRequest> {
    const learningRequest = await this.learningRequestRepository.findOneOrFail(
      id,
      {
        populate: ['course.administrator', 'requester.avatar'],
      }
    );
    if (learningRequest.course.administrator_id !== this.request.user.id) {
      throw new BadRequestException('Bạn không có quyền');
    }
    learningRequest.status = StatusLearningRequest.Reject;
    await this.learningRequestRepository.persistAndFlush(learningRequest);
    await this.notificationsService.sendNotificationToQueue({
      user_id: learningRequest.requester.id,
      type: NotificationType.Personal,
      payload: {
        type: NotificationPayloadType.LearningRequest,
        data: {
          request_id: learningRequest.id,
        },
        to: learningRequest.requester.id,
      } as NotificationRequestPayload,
    });
    return learningRequest;
  }
}
