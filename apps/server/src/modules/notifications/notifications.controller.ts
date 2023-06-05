import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import { NotificationResponse } from './responses/notification.response';
import { NotificationQueryDto } from './dtos/NotificationQuery.dto';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import { NotificationTransformer } from './transformers/notification.transformer';
import { MarkNotificationResponse } from './responses/mark-notification.response';

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

  @ApiOperation({ tags: [AppSwaggerTag.Notifications] })
  @Post('/mark-as-read')
  @ApiSuccessResponse(MarkNotificationResponse)
  @ApiErrorResponse()
  async readAllNotification() {
    return AppApiSuccessResponse.create(
      await this.notificationService.readAllNotification()
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Notifications] })
  @Post('/:id/mark-as-read')
  @ApiSuccessResponse(NotificationResponse)
  @ApiErrorResponse()
  async readNotification(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return AppApiSuccessResponse.create(
      await this.notificationService.readNotification(id)
    );
  }
}
