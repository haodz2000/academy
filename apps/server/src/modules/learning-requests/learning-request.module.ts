import { LearningRequestService } from './learning-request.service';
import { LearningRequestController } from './learning-request.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LearningRequest } from '@libs/entities/entities/LearningRequest';
import { CourseStudent } from '@libs/entities/entities/CourseStudent';
import { AbilityModule } from '../auth/ability/ability.module';
import { Course } from '@libs/entities/entities/Course';
import { NotificationsModule } from '../notifications/notifications.module';
import { Notification } from '@libs/entities/entities/Notification';
import { IsCourseIdValidator } from '@server/validators/is-course-id.validator';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      LearningRequest,
      CourseStudent,
      Course,
      Notification,
    ]),
    AbilityModule,
    NotificationsModule,
  ],
  controllers: [LearningRequestController],
  providers: [LearningRequestService, IsCourseIdValidator],
})
export class LearningRequestModule {}
