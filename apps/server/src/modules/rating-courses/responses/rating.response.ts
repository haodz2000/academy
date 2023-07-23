import { ApiProperty } from '@nestjs/swagger';
import { CourseResponse } from '@server/modules/courses/responses/course.response';
import { UserResponse } from '@server/modules/users/responses/user.response';
import { BaseResponse } from '@server/responses/base.response';

export class RatingResponse extends BaseResponse {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  course_id: number;

  @ApiProperty()
  point: number;

  @ApiProperty()
  comment: string;

  @ApiProperty({ type: UserResponse })
  user: UserResponse;
}
