import { Body, Controller, Post } from '@nestjs/common';
import { NotificationSubscriptionService } from './notification-subscription.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { NotificationSubscriptionResponse } from './responses/notification-subscription.response';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/utils/swagger';
import { NotificationSubscriptionCreateDto } from './dtos/notification-subscription-create.dto';
import { AppApiSuccessResponse } from '@libs/utils/responses';
import { NotificationSubscriptionTransformer } from './transformers/notification-subscription.transformer';

@Controller('notification-subscriptions')
export class NotificationSubscriptionController {
  constructor(
    private notificationSubscriptionsService: NotificationSubscriptionService
  ) {}

  @Post()
  @ApiOperation({
    tags: [AppSwaggerTag.NotificationSubscriptions],
  })
  @ApiSuccessResponse(NotificationSubscriptionResponse)
  @ApiErrorResponse()
  async create(@Body() data: NotificationSubscriptionCreateDto) {
    return AppApiSuccessResponse.create(
      NotificationSubscriptionTransformer.toNotificationSubscriptionResponse(
        await this.notificationSubscriptionsService.create(data)
      )
    );
  }
}
