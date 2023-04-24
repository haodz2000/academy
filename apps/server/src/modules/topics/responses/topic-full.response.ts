import { ApiProperty } from '@nestjs/swagger';
import { TopicResponse } from './topic.response';
import { CategoryResponse } from '@server/modules/categories/responses/category.response';
import { CourseResponse } from '@server/modules/courses/responses/course.response';

export class TopicFullResponse extends TopicResponse {
  @ApiProperty({ type: CategoryResponse, isArray: true })
  categories: CategoryResponse[];

  @ApiProperty({ type: CourseResponse, isArray: true })
  courses: CourseResponse[];
}
