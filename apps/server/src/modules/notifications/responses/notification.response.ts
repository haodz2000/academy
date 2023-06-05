import {
  NotificationPayloadType,
  NotificationStatus,
  NotificationType,
} from '@libs/constants/entities/Notification';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';
import { refs } from '@nestjs/swagger/dist/utils/get-schema-path.util';

export class FcmNotificationPayloadResponse {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  link: string;

  @ApiProperty({ required: false })
  imageUrl?: string;
}
export class NotificationRequestDataPayload {
  @ApiProperty()
  request_id: string;
}

export class NotificationPayloadResponse {
  @ApiProperty({ type: NotificationRequestDataPayload })
  data: NotificationRequestDataPayload;

  @ApiProperty({ enum: NotificationPayloadType })
  type: NotificationPayloadType;

  @ApiProperty()
  to: number;
}

export class NotificationPayloadLearningRequest extends NotificationPayloadResponse {
  @ApiProperty({ type: NotificationRequestDataPayload })
  data: NotificationRequestDataPayload;
}

export class NotificationPayloadTeachingRequest extends NotificationPayloadResponse {
  @ApiProperty({ type: NotificationRequestDataPayload })
  data: NotificationRequestDataPayload;
}

export class FcmMessageOptions {
  @ApiProperty({ required: false })
  link?: string;
}

export class FcmMessageWebpush {
  @ApiProperty({ type: FcmMessageOptions, required: false })
  fcmOptions?: FcmMessageOptions;
}

export class FcmMessageResponse {
  @ApiProperty({ type: FcmNotificationPayloadResponse })
  notification: FcmNotificationPayloadResponse;

  @ApiProperty({ type: FcmMessageWebpush, required: false })
  webpush?: FcmMessageWebpush;
}

export class NotificationResponse extends BaseSerialKeyResponse {
  @ApiProperty({ nullable: true })
  user_id: number | null;

  @ApiProperty({ type: NotificationPayloadResponse })
  payload!: NotificationPayloadResponse;

  @ApiProperty({ type: FcmMessageResponse })
  fcm_message!: FcmMessageResponse;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;
}
