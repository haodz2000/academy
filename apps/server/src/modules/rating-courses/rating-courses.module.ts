import { RatingCoursesService } from './rating-courses.service';
import { RatingCoursesController } from './rating-courses.controller';
0;
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@libs/entities/entities/User';
import { Course } from '@libs/entities/entities/Course';
import { RatingCourse } from '@libs/entities/entities/RatingCourse';
import { AbilityModule } from '../auth/ability/ability.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Course, RatingCourse]),
    AbilityModule,
  ],
  controllers: [RatingCoursesController],
  providers: [RatingCoursesService],
})
export class RatingCoursesModule {}
