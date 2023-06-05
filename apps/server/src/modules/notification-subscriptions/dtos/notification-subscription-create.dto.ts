import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NotificationSubscriptionCreateDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  token: string;
}
