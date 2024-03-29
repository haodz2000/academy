import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithUuidPrimaryKey } from '@libs/entities/entities/BaseEntityWithUuidPrimaryKey';
import { User } from './User';
import { Topic } from './Topic';
import { Course } from './Course';
import { Lesson } from './Lesson';

@Entity({ tableName: 'stored_files' })
export class StoredFile extends BaseEntityWithUuidPrimaryKey<StoredFile, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'name',
      'hash',
      'path',
      'key',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'text' })
  name!: Scalar['text'];

  @Unique()
  @Property({ type: 'text' })
  hash!: Scalar['text'];

  @Property({ type: 'text' })
  path!: Scalar['text'];

  @Property({ type: 'text' })
  key!: Scalar['text'];

  @OneToMany({
    entity: () => User,
    mappedBy: (user) => user.avatar,
  })
  user_avatar = new Collection<User>(this);

  @OneToMany({
    entity: () => Topic,
    mappedBy: (topic) => topic.cover,
  })
  topic_cover = new Collection<Topic>(this);

  @OneToMany({
    entity: () => Course,
    mappedBy: (course) => course.cover,
  })
  course_cover = new Collection<Course>(this);

  @OneToMany({
    entity: () => Lesson,
    mappedBy: (lesson) => lesson.video,
  })
  lessons = new Collection<Lesson>(this);

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_stored_files,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_stored_files,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
