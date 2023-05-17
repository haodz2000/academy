import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LearningRequestService } from './learning-request.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import { LearningRequestFilterDto } from './dtos/learning-request-filter.dto';
import { LearningRequestResponse } from './responses/learning-request.response';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import {
  CheckPolicies,
  ManageActionLearningRequestPolicyHandler,
} from '../auth/ability/ability.decorator';
import { LearningRequestDto } from './dtos/learning-request.dto';
import { LearningRequestTransformer } from './transformers/learning-request.transformer';

@Controller('learning-requests')
export class LearningRequestController {
  constructor(
    private readonly learningRequestService: LearningRequestService
  ) {}

  @ApiOperation({ tags: [AppSwaggerTag.LearningRequests] })
  @ApiPaginatedResponse(LearningRequestResponse)
  @ApiErrorResponse()
  @Get()
  async list(@Query() options: LearningRequestFilterDto) {
    const response = await this.learningRequestService.list(options);
    return AppApiPaginatedResponse.create(
      response.data.map((i) =>
        LearningRequestTransformer.toLearningRequestResponse(i)
      ),
      response.pagination
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.LearningRequests] })
  @ApiSuccessResponse(LearningRequestResponse)
  @ApiErrorResponse()
  @Post()
  async request(@Body() data: LearningRequestDto) {
    return AppApiSuccessResponse.create(
      await this.learningRequestService.createRequest(data)
    );
  }

  @CheckPolicies(new ManageActionLearningRequestPolicyHandler())
  @ApiOperation({ tags: [AppSwaggerTag.LearningRequests] })
  @ApiSuccessResponse(LearningRequestResponse)
  @ApiErrorResponse()
  @Put('/accept/:id')
  async accept(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: string
  ) {
    return AppApiSuccessResponse.create(
      await this.learningRequestService.accept(id)
    );
  }

  @CheckPolicies(new ManageActionLearningRequestPolicyHandler())
  @ApiOperation({ tags: [AppSwaggerTag.LearningRequests] })
  @ApiSuccessResponse(LearningRequestResponse)
  @ApiErrorResponse()
  @Put('/reject/:id')
  async reject(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: string
  ) {
    return AppApiSuccessResponse.create(
      await this.learningRequestService.reject(id)
    );
  }
}
