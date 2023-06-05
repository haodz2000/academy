import { ApiProperty } from '@nestjs/swagger';

export class MarkNotificationResponse {
  @ApiProperty()
  message: string;
}
