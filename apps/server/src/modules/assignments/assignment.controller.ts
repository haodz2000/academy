import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import { AssignmentResponse } from './responses/assignment.response';
import { FilterAssignmentDto } from './dtos/filter-assignemt.dto';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import { AssignmentTransformer } from './transformers/assignment.transformer';
import { InjectUserToBody } from '@server/decorators';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Assignments] })
  @ApiPaginatedResponse(AssignmentResponse)
  @ApiErrorResponse()
  @Get()
  async list(@Query() options: FilterAssignmentDto) {
    const result = await this.assignmentService.list(options);
    return AppApiPaginatedResponse.create(
      result.data.map((i) => AssignmentTransformer.toAssignmentResponse(i)),
      result.pagination
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Assignments] })
  @ApiSuccessResponse(AssignmentResponse)
  @ApiErrorResponse()
  @InjectUserToBody()
  @Post()
  async create(@Body() data: CreateAssignmentDto) {
    return AppApiSuccessResponse.create(
      await this.assignmentService.create(data)
    );
  }
}
