import { NotificationRead } from '@libs/constants/entities/Notification';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class NotificationQueryDto extends BaseDto {
  @ApiProperty({ nullable: true, default: 1, required: false })
  @IsOptional()
  page: number;

  @ApiProperty({ enum: NotificationRead, default: NotificationRead.UnRead })
  @IsOptional()
  read: NotificationRead;

  @ApiProperty({ default: 10 })
  @IsOptional()
  limit: number;
}
