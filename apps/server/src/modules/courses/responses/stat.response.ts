import { ApiProperty } from '@nestjs/swagger';

export class StatResponse {
  @ApiProperty()
  total_lessons: number;

  @ApiProperty()
  total_time: number;
}
