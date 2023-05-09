import { DiscussionModule } from '../discussions/discussion.module';
import { AssignmentModule } from './../assignments/assignment.module';
import { TopicModule } from './../topics/topic.module';
import { CourseModule } from './../courses/course.module';
import { CategoryModule } from './../categories/category.module';
import { UploadModule } from './../upload/upload.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '../mikro-orm/mikro-orm.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserModule } from '../users/user.module';
import { AbilityModule } from '../auth/ability/ability.module';
import { HttpErrorFilter } from '@server/filters/http-error.filter';
import { RavenInterceptor } from 'nest-raven';
import { ValidationException } from '@server/exceptions';

@Module({
  imports: [
    DiscussionModule,
    AssignmentModule,
    TopicModule,
    CourseModule,
    AbilityModule,
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
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [{ type: ValidationException }],
      }),
    },
  ],
})
export class AppModule {}
