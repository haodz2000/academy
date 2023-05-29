import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '@server/modules/app-swagger/app-swagger.constant';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/utils/swagger';
import { LessonResponse } from './responses/lesson.response';
import { AppApiSuccessResponse } from '@libs/utils/responses';
import { LessonTransformer } from './transformers/lesson.transformer';
import { UpdateLessonDto } from './dtos/update-lesson.dto';
import { DeleteResponse } from '../responses/delete.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { AbilitiesGuard } from '@server/modules/auth/ability/abilities.guard';

@UseGuards(AbilitiesGuard)
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Lessons] })
  @ApiConsumes('multipart/form-data')
  @ApiSuccessResponse(LessonResponse)
  @ApiErrorResponse()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  async create(
    @Body() data: CreateLessonDto,
    @UploadedFile() video: Express.Multer.File
  ) {
    return AppApiSuccessResponse.create(
      LessonTransformer.toLessonResponse(
        await this.lessonService.create({
          ...data,
          video: video,
        })
      )
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Lessons] })
  @ApiConsumes('multipart/form-data')
  @ApiSuccessResponse(LessonResponse)
  @ApiErrorResponse()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('video'))
  @Post('/:id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() data: UpdateLessonDto,
    @UploadedFile() video: Express.Multer.File
  ) {
    return AppApiSuccessResponse.create(
      LessonTransformer.toLessonResponse(
        await this.lessonService.update(id, { video, ...data })
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
