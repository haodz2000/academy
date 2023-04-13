import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from '@libs/entities/entities/BaseEntityWithSerialPrimaryKey';
import { User } from './User';
import { CategoryTopic } from './CategoryTopic';
import { Topic } from './Topic';

@Entity({ tableName: 'categories' })
export class Category extends BaseEntityWithSerialPrimaryKey<Category, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return ['id', 'name', 'slug', 'created_at', 'updated_at', 'deleted_at'];
  }

  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Unique()
  @Property()
  slug!: Scalar['varchar'];

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_categories,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_categories,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @OneToMany({
    entity: () => CategoryTopic,
    mappedBy: (categoryTopic) => categoryTopic.category,
  })
  category_topics = new Collection<CategoryTopic>(this);

  @ManyToMany({
    entity: () => Topic,
    inversedBy: 'categories',
    pivotEntity: () => CategoryTopic,
  })
  topics = new Collection<Topic>(this);
}
