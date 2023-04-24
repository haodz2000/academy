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
import { Topic } from './Topic';
import { CourseTopic } from './CourseTopic';
import { Section } from './Section';
import { CourseSubscribe } from './CourseSubscribe';

@Entity({ tableName: 'courses' })
export class Course extends BaseEntityWithSerialPrimaryKey<Course, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'name',
      'slug',
      'description',
      'administrator_id',
      'status',
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

  @Property({ type: 'text', nullable: true })
  description!: Scalar['text'];

  @Property({ type: 'smallint' })
  status!: Scalar['smallint'];

  @Property({ type: 'uuid' })
  cover_id!: Scalar['uuid'];

  @Property({ type: 'integer' })
  administrator_id!: Scalar['integer'];

  @ManyToOne({
    entity: () => StoredFile,
    inversedBy: (stored_file) => stored_file.course_cover,
    nullable: true,
  })
  cover!: StoredFile;

  @ManyToOne({
    entity: () => User,
    inversedBy: (user) => user.administrator_courses,
    nullable: true,
  })
  administrator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_courses,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_courses,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @OneToMany({
    entity: () => CourseTopic,
    mappedBy: (courseTopic) => courseTopic.course,
  })
  course_topics = new Collection<CourseTopic>(this);

  @ManyToMany({
    entity: () => Topic,
    inversedBy: 'courses',
    pivotEntity: () => CourseTopic,
  })
  topics = new Collection<Topic>(this);

  @OneToMany({
    entity: () => Section,
    mappedBy: (section) => section.course,
  })
  sections = new Collection<Section>(this);

  @OneToMany({
    entity: () => CourseSubscribe,
    mappedBy: (section) => section.course,
  })
  subscribers = new Collection<CourseSubscribe>(this);
}
