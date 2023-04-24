import { ApiProperty } from '@nestjs/swagger';
import { StatResponse } from './stat.response';
import { CourseResponse } from './course.response';

export class CourseStatResponse extends CourseResponse {
  @ApiProperty()
  totalLessons: number;

  @ApiProperty({ type: StatResponse })
  stat: StatResponse;
}
