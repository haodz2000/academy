import { ApiOperation } from '@nestjs/swagger';
import { DiscussionService } from './../discussions/discussion.service';
<<<<<<< HEAD
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
=======
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
>>>>>>> feat: api, show
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { CreateDiscussionDto } from './dtos/create-discussion.dto';
import { FilterDiscussionDto } from './dtos/filter-discussion.dto';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import { DiscussionResponse } from './responses/discussion.response';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import { DiscussionTransformer } from './transformers/discussion.transformer';
import { InjectUserToBody } from '@server/decorators';
import { DeleteUuidResponse } from './responses/delelteuuid.response';

@Controller('discussions')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Discussions] })
  @ApiPaginatedResponse(DiscussionResponse)
  @ApiErrorResponse()
  @Get()
  async list(@Query() options: FilterDiscussionDto) {
    const result = await this.discussionService.list(options);
    return AppApiPaginatedResponse.create(
      result.data.map((i) => DiscussionTransformer.toDiscussionResponse(i)),
      result.pagination
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Discussions] })
  @ApiSuccessResponse(DiscussionResponse)
  @ApiErrorResponse()
  @InjectUserToBody()
  @Post()
  async create(@Body() data: CreateDiscussionDto) {
    return AppApiSuccessResponse.create(
      await this.discussionService.create(data)
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Assignments] })
  @ApiSuccessResponse(DeleteUuidResponse)
  @ApiErrorResponse()
  @InjectUserToBody()
  @Delete('/:id')
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: string
  ) {
    return AppApiSuccessResponse.create(
      await this.discussionService.delete(id)
    );
  }
}
