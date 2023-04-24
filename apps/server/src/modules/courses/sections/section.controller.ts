import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '@server/modules/app-swagger/app-swagger.constant';
import { CreateSectionDto } from './dtos/create-section.dto';
import { AbilitiesGuard } from '@server/modules/auth/ability/abilities.guard';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/utils/swagger';
import { LessonResponse } from '../lessons/responses/lesson.response';
import { AppApiSuccessResponse } from '@libs/utils/responses';
import { SectionTransformer } from './transformers/section.transformer';

@UseGuards(AbilitiesGuard)
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Sections] })
  @UsePipes(new ValidationPipe())
  @ApiSuccessResponse(LessonResponse)
  @ApiErrorResponse()
  @Post()
  async create(@Body() data: CreateSectionDto) {
    return AppApiSuccessResponse.create(
      SectionTransformer.toSectionResponse(
        await this.sectionService.create(data)
      )
    );
  }
}
