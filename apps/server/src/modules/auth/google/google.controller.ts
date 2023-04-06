import { Body, Controller, Post } from '@nestjs/common';
import { GoogleLoginDto } from '@server/modules/auth/google/dtos/google-login.dto';
import { OAuth2Client } from 'google-auth-library';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '@server/modules/app-swagger/app-swagger.constant';
import { GoogleService } from '@server/modules/auth/google/google.service';
import { Public } from '@server/modules/auth/guards/public.guard';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/utils/swagger';
import { GoogleLoginResponse } from './responses/google-login.response';
import { AppApiSuccessResponse } from '@libs/utils/responses';
import { GoogleTransformer } from '@server/modules/auth/google/transformers/google.transfomer';

@Controller('auth/google')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Post()
  @ApiOperation({ tags: [AppSwaggerTag.AuthGoogle] })
  @ApiSuccessResponse(GoogleLoginResponse)
  @ApiErrorResponse()
  @Public()
  async login(@Body() loginDto: GoogleLoginDto) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: loginDto.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return AppApiSuccessResponse.create(
      GoogleTransformer.toGoogleLoginResponse(
        await this.googleService.login(payload)
      )
    );
  }
}
