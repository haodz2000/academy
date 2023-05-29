import { Topic } from '@libs/entities/entities/Topic';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { TopicQueryDto } from './dtos/topic-query.dto';
import { FilterQuery } from '@mikro-orm/core';
import { StatusCourse } from '@libs/constants/entities/Course';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: EntityRepository<Topic>
  ) {}

  async findAll(options: TopicQueryDto): Promise<Topic[]> {
    const where: FilterQuery<Topic> = {};
    if (options.c > 0) {
      where.categories = { id: options.c };
    }
    return await this.topicRepository.find(where, {
      populate: ['cover', 'courses.sections.lessons'],
      populateWhere: {
        courses: { status: StatusCourse.Approved },
      },
    });
  }

  async findOne(slug: Topic['slug']): Promise<Topic> {
    return await this.topicRepository.findOneOrFail(
      { slug: slug },
      {
        populate: [
          'categories',
          'courses',
          'courses.cover',
          'courses.administrator.avatar',
        ],
        populateWhere: {
          courses: { status: StatusCourse.Approved },
        },
      }
    );
  }
}
