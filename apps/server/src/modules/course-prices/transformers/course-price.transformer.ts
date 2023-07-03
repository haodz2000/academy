import { CoursePrice } from '@libs/entities/entities/CoursePrice';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { CoursePriceResponse } from '../responses/course-price.response';
import { IdSubject } from '@libs/constants/abilities';

export class CoursePriceTransformer extends BaseResponseTransformer {
  static toCoursePriceResponse(coursePrice: CoursePrice): CoursePriceResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(coursePrice),
      creator: null,
      updater: null,
      __typename: IdSubject.CoursePrices,
    };
  }
}
