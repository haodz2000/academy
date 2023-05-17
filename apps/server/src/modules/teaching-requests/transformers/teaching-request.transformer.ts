import { IdSubject } from '@libs/constants/abilities';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { TeachingRequestResponse } from '../responses/teaching-request.response';
import { TeachingRequest } from '@libs/entities/entities/TeachingRequest';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';
import { CourseTransformer } from '@server/modules/courses/transformers/course.transformer';

export class TeachingRequestTransformer extends BaseResponseTransformer {
  static toTeachingRequestResponse(
    data: TeachingRequest
  ): TeachingRequestResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(data),
      creator: null,
      updater: null,
      requester: UserTransformer.toUserResponse(data.requester),
      course: CourseTransformer.toCourseResponse(data.course),
      __typename: IdSubject.TeachingRequests,
    };
  }
}
