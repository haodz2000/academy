import { ApiOperation } from '@nestjs/swagger';
import { TeachingRequestDto } from './dtos/teaching-request.dto';
import { TeachingRequestService } from './teaching-request.service';
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
  UseGuards,
} from '@nestjs/common';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import { TeachingRequestResponse } from './responses/teaching-request.response';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import { TeachingRequestFilterDto } from './dtos/teaching-request-filter.dto';
import { AbilitiesGuard } from '../auth/ability/abilities.guard';
import {
  CheckPolicies,
  ManageActionTeachingRequestPolicyHandler,
} from '../auth/ability/ability.decorator';
import { TeachingRequestTransformer } from './transformers/teaching-request.transformer';

@UseGuards(AbilitiesGuard)
@Controller('teaching-requests')
export class TeachingRequestController {
  constructor(
    private readonly teachingRequestService: TeachingRequestService
  ) {}

  @CheckPolicies(new ManageActionTeachingRequestPolicyHandler())
  @ApiOperation({ tags: [AppSwaggerTag.TeachingRequests] })
  @ApiPaginatedResponse(TeachingRequestResponse)
  @ApiErrorResponse()
  @Get()
  async list(@Query() options: TeachingRequestFilterDto) {
    const result = await this.teachingRequestService.list(options);
    return AppApiPaginatedResponse.create(
      result.data.map((i) =>
        TeachingRequestTransformer.toTeachingRequestResponse(i)
      ),
      result.pagination
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.TeachingRequests] })
  @ApiSuccessResponse(TeachingRequestResponse)
  @ApiErrorResponse()
  @Post()
  async request(@Body() data: TeachingRequestDto) {
    return AppApiSuccessResponse.create(
      await this.teachingRequestService.createRequest(data)
    );
  }

  @CheckPolicies(new ManageActionTeachingRequestPolicyHandler())
  @ApiOperation({ tags: [AppSwaggerTag.TeachingRequests] })
  @ApiSuccessResponse(TeachingRequestResponse)
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
      await this.teachingRequestService.accept(id)
    );
  }

  @CheckPolicies(new ManageActionTeachingRequestPolicyHandler())
  @ApiOperation({ tags: [AppSwaggerTag.TeachingRequests] })
  @ApiSuccessResponse(TeachingRequestResponse)
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
      await this.teachingRequestService.reject(id)
    );
  }
}
