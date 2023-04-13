import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { IdSubject } from '@libs/constants/abilities';
import { TopicResponse } from '../responses/topic.response';
import { Topic } from '@libs/entities/entities/Topic';
import { StoredFileTransformer } from '@server/modules/stored-files/transformers/stored-file.transformer';
import { TopicFullResponse } from '../responses/topic-full.response';

export class TopicTransformer extends BaseResponseTransformer {
  static toTopicResponse(topic: Topic): TopicResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(topic),
      cover: topic.cover
        ? StoredFileTransformer.toStoredFileResponse(topic.cover)
        : null,
      __typename: IdSubject.Topics,
      creator: null,
      updater: null,
    };
  }

  static toTopicFullResponse(topic: Topic): TopicFullResponse {
    return {
      ...TopicTransformer.toTopicResponse(topic),
    };
  }
}
