import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';
import { CourseResponse } from '@server/modules/courses/responses/course.response';

export class TeacherResponse extends UserResponse {
  @ApiProperty({ type: CourseResponse, isArray: true })
  courses: CourseResponse[];
}
