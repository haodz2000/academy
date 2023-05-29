import { ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import {
  ApiErrorResponse,
  ApiPaginatedResponse,
  ApiSuccessResponse,
} from '@libs/utils/swagger';
import { UserResponse } from './responses/user.response';
import {
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';
import { UserTransformer } from './transformers/user.transformer';
import { FilterUserQueryDto } from './dtos/filter-user-query.dto';
import { Public } from '../auth/guards/public.guard';
import { UserPublicResponse } from './responses/user-public.response';
import { UserUpdateDto } from './dtos/user-update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ tags: [AppSwaggerTag.Users] })
  @ApiPaginatedResponse(UserResponse)
  @ApiErrorResponse()
  @Get()
  async list(@Query() option: FilterUserQueryDto) {
    const result = await this.userService.list(option);
    return AppApiPaginatedResponse.create(
      result.data.map((i) => UserTransformer.toUserResponse(i)),
      result.pagination
    );
  }

  @Public()
  @ApiOperation({ tags: [AppSwaggerTag.Users] })
  @ApiPaginatedResponse(UserPublicResponse)
  @ApiErrorResponse()
  @Get('/public')
  async public() {
    const result = await this.userService.public();
    return AppApiPaginatedResponse.create(
      result.data.map((i) => UserTransformer.toUserPublic(i)),
      result.pagination
    );
  }

  @ApiOperation({ tags: [AppSwaggerTag.Users] })
  @ApiSuccessResponse(UserResponse)
  @ApiErrorResponse()
  @Get('/profile')
  async profile() {
    return AppApiSuccessResponse.create(await this.userService.profile());
  }

  @ApiOperation({ tags: [AppSwaggerTag.Users] })
  @ApiSuccessResponse(UserResponse)
  @ApiErrorResponse()
  @Post()
  async update(@Body() data: UserUpdateDto) {
    return AppApiSuccessResponse.create(await this.userService.update(data));
  }
}
