import { Category } from '@libs/entities/entities/Category';
import { CategoryTopic } from '@libs/entities/entities/CategoryTopic';
import { Topic } from '@libs/entities/entities/Topic';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    @InjectRepository(Topic)
    private readonly topicRepository: EntityRepository<Topic>,
    @InjectRepository(CategoryTopic)
    private readonly categoryTopicRepository: EntityRepository<CategoryTopic>
  ) {}

  async list() {
    return await this.categoryRepository.findAll();
  }
}
