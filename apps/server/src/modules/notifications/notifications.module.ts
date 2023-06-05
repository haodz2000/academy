import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { Module } from '@nestjs/common';
import { Notification } from '@libs/entities/entities/Notification';
import { BullModule } from '@nestjs/bull';
import { QueueName } from '@libs/constants/queue';
import { NotificationConsumer } from './notification.consumer';
import { User } from '@libs/entities/entities/User';

@Module({
  imports: [
    MikroOrmModule.forFeature([Notification, User]),
    BullModule.registerQueue({
      name: QueueName.Notification,
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationConsumer],
  exports: [NotificationsService],
})
export class NotificationsModule {}
