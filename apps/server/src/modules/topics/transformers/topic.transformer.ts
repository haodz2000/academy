import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { IdSubject } from '@libs/constants/abilities';
import { TopicResponse } from '../responses/topic.response';
import { Topic } from '@libs/entities/entities/Topic';
import { StoredFileTransformer } from '@server/modules/stored-files/transformers/stored-file.transformer';
import { TopicFullResponse } from '../responses/topic-full.response';
import { CategoryTransformer } from '@server/modules/categories/transformers/category.transformer';
import { CourseTransformer } from '@server/modules/courses/transformers/course.transformer';
import { TopicStatResponse } from '../responses/topic-stat.response';

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

  static toTopicStatResponse(topic: Topic): TopicStatResponse {
    const courses = topic.courses.getItems().flat();
    const sections = courses.map((i) => i.sections.getItems().flat()).flat();
    const lessons = sections.map((i) => i.lessons.getItems().flat()).flat();
    return {
      ...this.toTopicResponse(topic),
      totalCourses: topic.courses.getItems().length || 0,
      totalVideos: lessons.length || 0,
    };
  }

  static toTopicFullResponse(topic: Topic): TopicFullResponse {
    return {
      ...TopicTransformer.toTopicResponse(topic),
      categories: topic.categories
        .getItems()
        .map((i) => CategoryTransformer.toCategoryResponse(i)),
      courses: topic.courses
        .getItems()
        .map((i) => CourseTransformer.toCourseResponse(i)),
    };
  }
}
