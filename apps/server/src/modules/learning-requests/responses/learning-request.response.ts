import { ApiProperty } from '@nestjs/swagger';
import { CourseResponse } from '@server/modules/courses/responses/course.response';
import { UserResponse } from '@server/modules/users/responses/user.response';
import { BaseUuidKeyResponse } from '@server/responses/base-uuid-key.response';

export class LearningRequestResponse extends BaseUuidKeyResponse {
  @ApiProperty()
  status: number;

  @ApiProperty()
  course_id: number;

  @ApiProperty()
  requester_id: number;

  @ApiProperty({ type: CourseResponse, nullable: true })
  course: CourseResponse | null;

  @ApiProperty({ type: UserResponse, nullable: true })
  requester: UserResponse | null;
}
