import { StoredFile } from '@libs/entities/entities/StoredFile';
import { LessonController } from './lessons/lesson.controller';
import { LessonService } from './lessons/lesson.service';
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
import { SectionController } from './sections/section.controller';
import { IsArrayTopicIdsValidator } from '@server/validators/is-array-topic-ids.validator';
import { IsSectionIdValidator } from '@server/validators/is-section-id.validator';
import { CoursePrice } from '@libs/entities/entities/CoursePrice';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
      Course,
      Section,
      Lesson,
      Topic,
      CourseTopic,
      StoredFile,
      CoursePrice,
    ]),
    UploadModule,
    AbilityModule,
  ],
  controllers: [CourseController, SectionController, LessonController],
  providers: [
    CourseService,
    SectionService,
    LessonService,
    IsArrayTopicIdsValidator,
    IsSectionIdValidator,
  ],
})
export class CourseModule {}
