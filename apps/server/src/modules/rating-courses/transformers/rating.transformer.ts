import { RatingCourse } from '@libs/entities/entities/RatingCourse';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { RatingResponse } from '../responses/rating.response';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';
import { IdSubject } from '@libs/constants/abilities';

export class RatingTransformer extends BaseResponseTransformer {
  static toRatingResponse(rating: RatingCourse): RatingResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(rating),
      creator: null,
      updater: null,
      user: UserTransformer.toUserResponse(rating.user),
      __typename: IdSubject.RatingCourse,
    };
  }
}
