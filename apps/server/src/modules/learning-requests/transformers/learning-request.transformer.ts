import { IdSubject } from '@libs/constants/abilities';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';
import { CourseTransformer } from '@server/modules/courses/transformers/course.transformer';
import { LearningRequest } from '@libs/entities/entities/LearningRequest';
import { LearningRequestResponse } from '../responses/learning-request.response';

export class LearningRequestTransformer extends BaseResponseTransformer {
  static toLearningRequestResponse(
    data: LearningRequest
  ): LearningRequestResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(data),
      creator: null,
      updater: null,
      requester: data.requester
        ? UserTransformer.toUserResponse(data.requester)
        : null,
      course: data.course
        ? CourseTransformer.toCourseResponse(data.course)
        : null,
      __typename: IdSubject.LearningRequest,
    };
  }
}
