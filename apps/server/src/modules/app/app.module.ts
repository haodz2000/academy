import { FirebaseModule } from './../firebase/firebase.module';
import { NotificationsModule } from './../notifications/notifications.module';
import { QueuePrefix } from '@libs/constants/queue';
import { NotificationSubscriptionModule } from './../notification-subscriptions/notification-subscription.module';
import { TeachingRequestModule } from './../teaching-requests/teaching-request.module';
import { LearningRequestModule } from '../learning-requests/learning-request.module';
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
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    FirebaseModule,
    NotificationsModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
      prefix: QueuePrefix.Queue,
    }),
    NotificationSubscriptionModule,
    TeachingRequestModule,
    LearningRequestModule,
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
