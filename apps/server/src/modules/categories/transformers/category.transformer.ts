import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { IdSubject } from '@libs/constants/abilities';
import { Category } from '@libs/entities/entities/Category';
import { CategoryResponse } from '../responses/category.response';
import { CategoryFullResponse } from '../responses/category-full.response';
import { TopicTransformer } from '@server/modules/topics/transformers/topic.transformer';

export class CategoryTransformer extends BaseResponseTransformer {
  static toCategoryResponse(category: Category): CategoryResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(category),
      __typename: IdSubject.Categories,
      creator: null,
      updater: null,
    };
  }

  static toCategoryFullResponse(category: Category): CategoryFullResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(category),
      topics: category.topics
        .getItems()
        .map((i) => TopicTransformer.toTopicFullResponse(i)),
      __typename: IdSubject.Categories,
      creator: null,
      updater: null,
    };
  }
}
