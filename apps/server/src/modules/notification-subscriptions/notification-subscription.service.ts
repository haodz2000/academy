import { NotificationSubscription } from '@libs/entities/entities/NotificationSubscription';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { NotificationSubscriptionCreateDto } from './dtos/notification-subscription-create.dto';
import { Request } from 'express';
import { NotificationSubscriptionStatus } from '@libs/constants/entities/NotificationSubscription';
import 'multer';

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    @InjectRepository(NotificationSubscription)
    private readonly notificationSubscriptionRepository: EntityRepository<NotificationSubscription>,
    @Inject(REQUEST) private request: Request,
    private readonly em: EntityManager
  ) {}

  async create(
    data: NotificationSubscriptionCreateDto
  ): Promise<NotificationSubscription> {
    let subscription = await this.notificationSubscriptionRepository.findOne({
      user_id: this.request.user.id,
      token: data.token,
    });
    if (subscription) {
      subscription.last_active = new Date();
      subscription.status = NotificationSubscriptionStatus.Active;
    } else {
      subscription = this.notificationSubscriptionRepository.create({
        user_id: this.request.user.id,
        last_active: new Date(),
        token: data.token,
        status: NotificationSubscriptionStatus.Active,
      });
    }
    await this.notificationSubscriptionRepository.persistAndFlush(subscription);
    return this.notificationSubscriptionRepository.findOneOrFail({
      id: subscription.id,
    });
  }
}
