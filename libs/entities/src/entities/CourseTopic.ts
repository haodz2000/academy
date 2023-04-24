import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Topic } from './Topic';
import { BaseEntityWithCompositeKeys } from '@libs/entities/entities/BaseEntityWithCompositeKeys';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { Course } from './Course';
import { User } from './User';

@Entity({ tableName: 'course_topics' })
export class CourseTopic extends BaseEntityWithCompositeKeys<
  CourseTopic,
  'course_id' | 'topic_id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return ['topic_id', 'course_id', 'created_at', 'updated_at', 'deleted_at'];
  }

  @Property({ type: 'integer', nullable: true })
  topic_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true })
  course_id!: Scalar['integer'];

  [PrimaryKeyType]?: [number, number];

  @ManyToOne({
    primary: true,
    entity: () => Topic,
    inversedBy: (topic) => topic.course_topics,
    nullable: true,
  })
  topic!: Topic;

  @ManyToOne({
    primary: true,
    entity: () => Course,
    inversedBy: (course) => course.course_topics,
    nullable: true,
  })
  course!: Course;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_course_topics,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_course_topics,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
