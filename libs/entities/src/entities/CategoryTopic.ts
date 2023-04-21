import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Category } from './Category';
import { Topic } from './Topic';
import { BaseEntityWithCompositeKeys } from '@libs/entities/entities/BaseEntityWithCompositeKeys';
import { Scalar } from '@libs/constants/interfaces/scalar';

@Entity({ tableName: 'category_topics' })
export class CategoryTopic extends BaseEntityWithCompositeKeys<
  CategoryTopic,
  'category_id' | 'topic_id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'topic_id',
      'category_id',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer', nullable: true })
  topic_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true })
  category_id!: Scalar['integer'];

  [PrimaryKeyType]?: [number, number];

  @ManyToOne({
    primary: true,
    entity: () => Topic,
    inversedBy: (topic) => topic.category_topics,
    nullable: true,
  })
  topic!: Topic;

  @ManyToOne({
    primary: true,
    entity: () => Category,
    inversedBy: (category) => category.category_topics,
    nullable: true,
  })
  category!: Category;
}
