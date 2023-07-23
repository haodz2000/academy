import { ApiProperty } from '@nestjs/swagger';

export class CourseStatsResponse {
  @ApiProperty()
  total_course: number;

  @ApiProperty()
  total_video: number;

  @ApiProperty()
  total_time: number;
}
