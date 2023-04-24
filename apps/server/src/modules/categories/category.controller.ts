import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from '../auth/guards/public.guard';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { ApiErrorResponse, ApiPaginatedResponse } from '@libs/utils/swagger';
import { AppApiPaginatedResponse } from '@libs/utils/responses';
import { CategoryTransformer } from './transformers/category.transformer';
import { CategoryResponse } from './responses/category.response';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @ApiOperation({ tags: [AppSwaggerTag.Categories] })
  @ApiPaginatedResponse(CategoryResponse)
  @ApiErrorResponse()
  @Public()
  @Get()
  async list() {
    return AppApiPaginatedResponse.create(
      (await this.categoryService.list()).map((i) =>
        CategoryTransformer.toCategoryResponse(i)
      )
    );
  }
}
