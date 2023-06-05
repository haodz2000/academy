import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { Notification } from '@libs/entities/entities/Notification';
import {
  FcmMessageResponse,
  NotificationPayloadResponse,
  NotificationResponse,
} from '../responses/notification.response';

export class NotificationTransformer extends BaseResponseTransformer {
  static toNotificationResponse(
    notification: Notification
  ): NotificationResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(notification),
      payload: notification.payload as NotificationPayloadResponse,
      fcm_message: notification.fcm_message as FcmMessageResponse,
      creator: null,
      updater: null,
    };
  }
}
