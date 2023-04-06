import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppSwaggerTag } from '../app-swagger/app-swagger.constant';
import { Public } from '../auth/guards/public.guard';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ tags: [AppSwaggerTag.App] })
  @Get()
  getData() {
    return this.appService.getData();
  }
}
