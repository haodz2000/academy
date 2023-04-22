import { SectionService } from './sections/section.service';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@libs/entities/entities/User';
import { Course } from '@libs/entities/entities/Course';
import { Section } from '@libs/entities/entities/Section';
import { Lesson } from '@libs/entities/entities/Lesson';
import { Topic } from '@libs/entities/entities/Topic';
import { CourseTopic } from '@libs/entities/entities/CourseTopic';
import { UploadModule } from '../upload/upload.module';
import { AbilityModule } from '../auth/ability/ability.module';
import { CourseSubscribe } from '@libs/entities/entities/CourseSubscribe';
import { SectionController } from './sections/section.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
      Course,
      Section,
      Lesson,
      Topic,
      CourseTopic,
      CourseSubscribe,
    ]),
    UploadModule,
    AbilityModule,
  ],
  controllers: [CourseController, SectionController],
  providers: [CourseService, SectionService],
})
export class CourseModule {}
