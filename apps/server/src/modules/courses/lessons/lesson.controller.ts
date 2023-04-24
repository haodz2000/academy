/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '@server/modules/app-swagger/app-swagger.constant';
import { CreateLessonDto } from './dtos/create-lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Lessons] })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() data: CreateLessonDto) {
    return await this.lessonService.create(data);
  }
}
