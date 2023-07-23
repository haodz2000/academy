import { IdSubject } from '@libs/constants/abilities';
import { Course } from '@libs/entities/entities/Course';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { CourseResponse } from '../responses/course.response';
import { StoredFileTransformer } from '@server/modules/stored-files/transformers/stored-file.transformer';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';
import { CourseDetailResponse } from '../responses/course-detail.response';
import { TopicTransformer } from '@server/modules/topics/transformers/topic.transformer';
import { SectionTransformer } from '../sections/transformers/section.transformer';
import { CoursePriceTransformer } from '@server/modules/course-prices/transformers/course-price.transformer';
import { CourseStatsResponse } from '../responses/course-stats.response';

export class CourseTransformer extends BaseResponseTransformer {
  static toCourseResponse(course: Course): CourseResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(course),
      creator: course.creator
        ? UserTransformer.toUserResponse(course.creator)
        : null,
      updater: null,
      cover: course.cover
        ? StoredFileTransformer.toBasicStoredFileResponse(course.cover)
        : null,
      administrator: course.administrator
        ? UserTransformer.toUserResponse(course.administrator)
        : null,
      course_price: CoursePriceTransformer.toCoursePriceResponse(
        course.course_price
      ),
      __typename: IdSubject.Courses,
    };
  }

  static toCourseDetailResponse(course: Course): CourseDetailResponse {
    return {
      ...this.toCourseResponse(course),
      sections: course.sections
        .getItems()
        .map((i) => SectionTransformer.toSectionResponseFull(i)),
      topics: course.topics
        .getItems()
        .map((i) => TopicTransformer.toTopicResponse(i)),
      students: course.students
        .getItems()
        .map((i) => UserTransformer.toUserResponse(i)),
    };
  }

  static toCourseStatsResponse(data: CourseStatsResponse): CourseStatsResponse {
    return {
      ...data,
    };
  }
}
