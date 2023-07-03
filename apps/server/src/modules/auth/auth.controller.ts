import { UserService } from './../users/user.service';
import { AppApiSuccessResponse } from '@libs/utils/responses';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/utils/swagger';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { UserResponse } from '../users/responses/user.response';
import { UserTransformer } from '../users/transformers/user.transformer';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @ApiOperation({ tags: [AppSwaggerTag.Auth] })
  @ApiSuccessResponse(UserResponse)
  @ApiErrorResponse()
  @Get('/me')
  async me() {
    return AppApiSuccessResponse.create(
      UserTransformer.toUserResponse(await this.userService.me())
    );
  }
}
