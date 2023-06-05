import { NotificationQueueJob, QueueName } from '@libs/constants/queue';
import { Notification } from '@libs/entities/entities/Notification';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import 'multer';
import { NotificationQueryDto } from './dtos/NotificationQuery.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Pagination } from '@libs/utils/responses';
import { NotificationRead } from '@libs/constants/entities/Notification';
import { MarkNotificationResponse } from './responses/mark-notification.response';

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
    console.log(option.limit);
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

  async readAllNotification(): Promise<MarkNotificationResponse> {
    const notification = await this.notificationRepository.findOneOrFail(
      {
        user_id: this.request.user.id,
        read: NotificationRead.UnRead,
      },
      {
        orderBy: { created_at: 'DESC' },
      }
    );
    if (!notification) {
      return { message: 'Tất cả thông báo đã được đọc' };
    }
    const payload = {
      requester_id: this.request.user.id,
      notificationId: notification.id,
    };
    await this.notificationQueue.add(NotificationQueueJob.MarkAsRead, payload, {
      delay: 1000,
    });
    return {
      message: 'Yêu cầu sẽ được xử lý trong giây lát',
    };
  }

  async readNotification(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOneOrFail({
      id,
      user_id: this.request.user.id,
    });
    if (notification.read === NotificationRead.Read) {
      throw new BadRequestException('Thông báo này đã được đánh dấu');
    }
    notification.read = NotificationRead.Read;
    await this.notificationRepository.persistAndFlush(notification);
    return notification;
  }
}
