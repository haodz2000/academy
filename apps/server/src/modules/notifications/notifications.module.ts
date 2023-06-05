import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { Module } from '@nestjs/common';
import { Notification } from '@libs/entities/entities/Notification';
import { BullModule } from '@nestjs/bull';
import { QueueName } from '@libs/constants/queue';
import { NotificationConsumer } from './notification.consumer';
import { User } from '@libs/entities/entities/User';
import { SocketModule } from '../socket/socket.module';
import { SocketGateway } from '../socket/socket.gateway';
import { RedisIoAdapter } from '../socket/redis-io.adapter';

@Module({
  imports: [
    MikroOrmModule.forFeature([Notification, User]),
    BullModule.registerQueue({
      name: QueueName.Notification,
    }),
    SocketModule,
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationConsumer,
    SocketGateway,
    RedisIoAdapter,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
