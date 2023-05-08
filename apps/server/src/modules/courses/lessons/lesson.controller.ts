/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '@server/modules/app-swagger/app-swagger.constant';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/utils/swagger';
import { LessonResponse } from './responses/lesson.response';
import { AppApiSuccessResponse } from '@libs/utils/responses';
import { LessonTransformer } from './transformers/lesson.transformer';
import { UpdateLessonDto } from './dtos/update-lesson.dto';
import { DeleteResponse } from '../responses/delete.response';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Lessons] })
  @ApiSuccessResponse(LessonResponse)
  @ApiErrorResponse()
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() data: CreateLessonDto) {
    return AppApiSuccessResponse.create(
      LessonTransformer.toLessonResponse(await this.lessonService.create(data))
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Lessons] })
  @ApiSuccessResponse(LessonResponse)
  @ApiErrorResponse()
  @UsePipes(new ValidationPipe())
  @Post('/:id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() data: UpdateLessonDto
  ) {
    return AppApiSuccessResponse.create(
      LessonTransformer.toLessonResponse(
        await this.lessonService.update(id, data)
      )
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Lessons] })
  @ApiSuccessResponse(DeleteResponse)
  @ApiErrorResponse()
  @Delete('/:id')
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return AppApiSuccessResponse.create(await this.lessonService.delete(id));
  }
}
