import { CategoryModule } from './../categories/category.module';
import { UploadModule } from './../upload/upload.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '../mikro-orm/mikro-orm.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserModule } from '../users/user.module';
import { AbilityModule } from '../auth/ability/ability.module';

@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule,
    UserModule,
    AuthModule,
    UploadModule,
    AbilityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
