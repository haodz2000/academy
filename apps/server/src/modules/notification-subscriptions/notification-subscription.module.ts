import { NotificationSubscriptionService } from './notification-subscription.service';
import { NotificationSubscriptionController } from './notification-subscription.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NotificationSubscription } from '@libs/entities/entities/NotificationSubscription';

@Module({
  imports: [MikroOrmModule.forFeature([NotificationSubscription])],
  controllers: [NotificationSubscriptionController],
  providers: [NotificationSubscriptionService],
  exports: [NotificationSubscriptionService],
})
export class NotificationSubscriptionModule {}
