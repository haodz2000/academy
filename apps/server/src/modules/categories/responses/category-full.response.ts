import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponse } from './category.response';
import { TopicFullResponse } from '@server/modules/topics/responses/topic-full.response';

export class CategoryFullResponse extends CategoryResponse {
  @ApiProperty({ type: TopicFullResponse, isArray: true, nullable: true })
  topics: TopicFullResponse[];
}
