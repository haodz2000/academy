import { IdSubject } from '@libs/constants/abilities';
import { Discuss } from '@libs/entities/entities/Discuss';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { DiscussionResponse } from '../responses/discussion.response';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';

export class DiscussionTransformer extends BaseResponseTransformer {
  static toDiscussionResponse(discussion: Discuss): DiscussionResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(discussion),
      creator: discussion.creator
        ? UserTransformer.toUserResponse(discussion.creator)
        : null,
      updater: null,
      __typename: IdSubject.Discussions,
    };
  }
}
