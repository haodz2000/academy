import { NotificationRead } from '@libs/constants/entities/Notification';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationQueryDto {
  @ApiProperty({ nullable: true, default: 1, required: false })
  page: number;

  @ApiProperty({ enum: NotificationRead, default: NotificationRead.UnRead })
  read: NotificationRead;

  @ApiProperty({ default: 10 })
  limit: number;
}
