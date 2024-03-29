import { UserResponse } from '@server/modules/users/responses/user.response';
import { ApiProperty } from '@nestjs/swagger';
import { CourseResponse } from './course.response';
import { SectionFullResponse } from '../sections/responses/section-full.response';
import { TopicResponse } from '@server/modules/topics/responses/topic.response';

export class CourseDetailResponse extends CourseResponse {
  @ApiProperty({ type: SectionFullResponse, isArray: true, nullable: true })
  sections?: SectionFullResponse[];

  @ApiProperty({ type: TopicResponse, isArray: true, nullable: true })
  topics: TopicResponse[];

  @ApiProperty({ type: UserResponse, isArray: true, nullable: true })
  students: UserResponse[];
}
