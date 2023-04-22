import { IdSubject } from '@libs/constants/abilities';
import { Course } from '@libs/entities/entities/Course';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { CourseResponse } from '../responses/course.response';
import { StoredFileTransformer } from '@server/modules/stored-files/transformers/stored-file.transformer';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';

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
      administrator: UserTransformer.toUserResponse(course.administrator),
      __typename: IdSubject.Courses,
    };
  }
}
