import { ApiProperty } from '@nestjs/swagger';
import { TopicResponse } from './topic.response';

export class TopicStatResponse extends TopicResponse {
  @ApiProperty()
  totalCourses: number;

  @ApiProperty()
  totalVideos: number;
}
