import { NotificationQueueJob, QueueName } from '@libs/constants/queue';
import { Notification } from '@libs/entities/entities/Notification';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import 'multer';
import { NotificationQueryDto } from './dtos/NotificationQuery.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Pagination } from '@libs/utils/responses';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: EntityRepository<Notification>,
    @InjectQueue(QueueName.Notification) private notificationQueue: Queue,
    @Inject(REQUEST) private request: Request
  ) {}

  async sendNotificationToQueue(data: RequiredEntityData<Notification>) {
    const notification = this.notificationRepository.create(data);
    await this.notificationRepository.persistAndFlush(
      this.notificationRepository.create(notification)
    );
    await this.notificationQueue.add(NotificationQueueJob.Send, notification, {
      delay: 1000,
    });
  }

  async list(
    option: NotificationQueryDto
  ): Promise<{ data: Notification[]; pagination: Pagination }> {
    const where: FilterQuery<Notification> = {};
    where.user_id = this.request.user.id;
    if (option.read) {
      where.read = option.read;
    }
    const [notifications, count] =
      await this.notificationRepository.findAndCount(where, {
        offset: (option.page - 1) * option.limit,
        limit: option.limit,
        orderBy: {
          read: 'ASC',
          created_at: 'DESC',
        },
      });
    return {
      data: notifications,
      pagination: {
        limit: option.limit,
        total: count,
        page: option.page,
        lastPage: Math.ceil(count / option.limit),
      },
    };
  }
}
