import { CategoryTopic } from './CategoryTopic';
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
import { StoredFile } from './StoredFile';
import { Category } from './Category';

@Entity({ tableName: 'topics' })
export class Topic extends BaseEntityWithSerialPrimaryKey<Topic, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'name',
      'slug',
      'cover_id',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Unique()
  @Property()
  slug!: Scalar['varchar'];

  @Property({ type: 'uuid' })
  cover_id!: Scalar['uuid'];

  @ManyToOne({
    entity: () => StoredFile,
    inversedBy: (stored_file) => stored_file.topic_cover,
    nullable: true,
  })
  cover!: StoredFile;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_topics,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_topics,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @OneToMany({
    entity: () => CategoryTopic,
    mappedBy: (categoryTopic) => categoryTopic.topic,
  })
  category_topics = new Collection<CategoryTopic>(this);

  @ManyToMany({
    entity: () => Category,
    mappedBy: 'topics',
    pivotEntity: () => CategoryTopic,
  })
  categories = new Collection<Category>(this);
}
