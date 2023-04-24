import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { IdSubject } from '@libs/constants/abilities';
import { LessonResponse } from '../responses/lesson.response';
import { Lesson } from '@libs/entities/entities/Lesson';
import { LessonFullRespone } from '../responses/lesson-full.response';
import { CourseTransformer } from '../../transformers/course.transformer';

export class LessonTransformer extends BaseResponseTransformer {
  static toLessonResponse(lesson: Lesson): LessonResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(lesson),
      creator: null,
      updater: null,
      __typename: IdSubject.Lessons,
    };
  }

  static toLessonFullResponse(lesson: Lesson): LessonFullRespone {
    return {
      ...this.toLessonResponse(lesson),
      course: lesson.section.course
        ? CourseTransformer.toCourseResponse(lesson.section.course)
        : null,
    };
  }
}
