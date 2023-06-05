import { Controller, Get, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { ApiErrorResponse, ApiPaginatedResponse } from '@libs/utils/swagger';
import { NotificationResponse } from './responses/NotificationResponse';
import { NotificationQueryDto } from './dtos/NotificationQuery.dto';
import { AppApiPaginatedResponse } from '@libs/utils/responses';
import { NotificationTransformer } from './transformers/notification.transformer';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Notifications] })
  @ApiPaginatedResponse(NotificationResponse)
  @ApiErrorResponse()
  @Get()
  async list(@Query() option: NotificationQueryDto) {
    const result = await this.notificationService.list(option);
    return AppApiPaginatedResponse.create(
      result.data.map((i) => NotificationTransformer.toNotificationResponse(i)),
      result.pagination
    );
  }
}
