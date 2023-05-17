import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { InjectUserToQuery } from '@server/decorators';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import { CourseTransformer } from './transformers/course.transformer';
import { CourseResponse } from './responses/course.response';
import { CourseCreateDto } from './dtos/course-create.dto';
import { AbilitiesGuard } from '../auth/ability/abilities.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseUpdateDto } from './dtos/course-update.dto';
import { DeleteResponse } from './responses/delete.response';
import { CourseDetailResponse } from './responses/course-detail.response';
import { CourseFilterDto } from './dtos/course-filter.dto';

@UseGuards(AbilitiesGuard)
@Controller('courses')
export class CourseController {
  constructor(private readonly courseSerive: CourseService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Courses] })
  @UseInterceptors()
  @ApiPaginatedResponse(CourseResponse)
  @ApiErrorResponse()
  @InjectUserToQuery()
  @Get()
  async list(@Query() option: CourseFilterDto) {
    const result = await this.courseSerive.list(option);
    return AppApiPaginatedResponse.create(
      result.data.map((i) => CourseTransformer.toCourseResponse(i)),
      result.pagination
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Courses] })
  @UseInterceptors()
  @ApiSuccessResponse(CourseDetailResponse)
  @ApiErrorResponse()
  @InjectUserToQuery()
  @Get('/:slug')
  async findOne(@Param('slug') slug: string) {
    return AppApiSuccessResponse.create(
      CourseTransformer.toCourseDetailResponse(
        await this.courseSerive.findOne(slug)
      )
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Courses] })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('cover'))
  @UsePipes(new ValidationPipe())
  @ApiSuccessResponse(CourseResponse)
  @ApiErrorResponse()
  @Post()
  async create(
    @UploadedFile() cover: Express.Multer.File,
    @Body() data: CourseCreateDto
  ) {
    return AppApiSuccessResponse.create(
      await this.courseSerive.create({ ...data, cover })
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Courses] })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('cover'))
  @UsePipes(new ValidationPipe())
  @ApiSuccessResponse(CourseResponse)
  @ApiErrorResponse()
  @Put('/:id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @UploadedFile() cover: Express.Multer.File,
    @Body() data: CourseUpdateDto
  ) {
    return AppApiSuccessResponse.create(
      await this.courseSerive.update(id, { ...data, cover })
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Courses] })
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
    return AppApiSuccessResponse.create(await this.courseSerive.delete(id));
  }
}
