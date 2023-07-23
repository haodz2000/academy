import { RateDto } from './dtos/rate.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RatingCoursesService } from './rating-courses.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { RateQueryDto } from './dtos/rate-query.dto';
import { ApiErrorResponse, ApiPaginatedResponse } from '@libs/utils/swagger';
import { RatingResponse } from './responses/rating.response';
import { AppApiPaginatedResponse } from '@libs/utils/responses';
import { RatingTransformer } from './transformers/rating.transformer';
import { AverageResponse } from './responses/average.response';

@Controller('rating-courses')
export class RatingCoursesController {
  constructor(private readonly ratingCoursesService: RatingCoursesService) {}

  @ApiOperation({ tags: [AppSwaggerTag.RatingCourses] })
  @ApiPaginatedResponse(RatingResponse)
  @ApiErrorResponse()
  @Get()
  async list(@Query() option: RateQueryDto) {
    const result = await this.ratingCoursesService.list(option);
    return AppApiPaginatedResponse.create(
      result.data.map((i) => RatingTransformer.toRatingResponse(i)),
      result.pagination
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.RatingCourses] })
  @ApiPaginatedResponse(AverageResponse)
  @ApiErrorResponse()
  @Get(':id/point')
  async getPoint(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return await this.ratingCoursesService.getPoint(id);
  }

  @ApiOperation({ tags: [AppSwaggerTag.RatingCourses] })
  @Post()
  async rate(@Body() data: RateDto) {
    return await this.ratingCoursesService.rate(data);
  }
}
