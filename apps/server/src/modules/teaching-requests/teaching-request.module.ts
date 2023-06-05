import { TeachingRequestService } from './teaching-request.service';
import { TeachingRequestController } from './teaching-request.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from '@libs/entities/entities/Course';
import { User } from '@libs/entities/entities/User';
import { TeachingRequest } from '@libs/entities/entities/TeachingRequest';
import { AbilityModule } from '../auth/ability/ability.module';
import { CourseTeacher } from '@libs/entities/entities/CourseTeacher';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Course, User, TeachingRequest, CourseTeacher]),
    AbilityModule,
    NotificationsModule,
  ],
  controllers: [TeachingRequestController],
  providers: [TeachingRequestService],
})
export class TeachingRequestModule {}
