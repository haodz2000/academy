import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { DeleteResponse } from '../responses/delete.response';
import { UpdateSectionDto } from './dtos/update-section.dto';

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

  @ApiOperation({ tags: [AppSwaggerTag.Sections] })
  @UsePipes(new ValidationPipe())
  @ApiSuccessResponse(LessonResponse)
  @ApiErrorResponse()
  @Post('/:id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() data: UpdateSectionDto
  ) {
    return AppApiSuccessResponse.create(
      SectionTransformer.toSectionResponse(
        await this.sectionService.update(id, data)
      )
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Sections] })
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
    return AppApiSuccessResponse.create(await this.sectionService.delete(id));
  }
}
