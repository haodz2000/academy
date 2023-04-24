import { Section } from '@libs/entities/entities/Section';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { SectionRespone } from '../responses/section.response';
import { IdSubject } from '@libs/constants/abilities';
import { SectionFullResponse } from '../responses/section-full.response';
import { LessonTransformer } from '../../lessons/transformers/lesson.transformer';

export class SectionTransformer extends BaseResponseTransformer {
  static toSectionResponse(section: Section): SectionRespone {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(section),
      creator: null,
      updater: null,
      __typename: IdSubject.Sections,
    };
  }

  static toSectionResponseFull(section: Section): SectionFullResponse {
    return {
      ...this.toSectionResponse(section),
      lessons: section.lessons
        .getItems()
        .map((i) => LessonTransformer.toLessonResponse(i)),
    };
  }
}
