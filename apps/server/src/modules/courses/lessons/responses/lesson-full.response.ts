import { ApiProperty } from '@nestjs/swagger';
import { LessonResponse } from './lesson.response';
import { CourseResponse } from '../../responses/course.response';

export class LessonFullRespone extends LessonResponse {
  @ApiProperty({ type: CourseResponse })
  course?: CourseResponse;
}
