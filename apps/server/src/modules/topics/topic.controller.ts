import { Controller, Get, Param, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import { TopicFullResponse } from './responses/topic-full.response';
import { Public } from '../auth/guards/public.guard';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import { TopicTransformer } from './transformers/topic.transformer';
import { TopicStatResponse } from './responses/topic-stat.response';
import { TopicQueryDto } from './dtos/topic-query.dto';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Topics] })
  @ApiPaginatedResponse(TopicStatResponse)
  @ApiErrorResponse()
  @Public()
  @Get()
  async findAll(@Query() query: TopicQueryDto) {
    return AppApiPaginatedResponse.create(
      (await this.topicService.findAll(query)).map((i) =>
        TopicTransformer.toTopicStatResponse(i)
      )
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Topics] })
  @ApiSuccessResponse(TopicFullResponse)
  @ApiErrorResponse()
  @Public()
  @Get('/:slug')
  async findOne(@Param('slug') slug: string) {
    return AppApiSuccessResponse.create(
      TopicTransformer.toTopicFullResponse(
        await this.topicService.findOne(slug)
      )
    );
  }
}
