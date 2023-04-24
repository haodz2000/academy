import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { User } from './User';
import { BaseEntityWithUuidPrimaryKey } from './BaseEntityWithUuidPrimaryKey';
import { Course } from './Course';

@Entity({ tableName: 'course_subscribes' })
export class CourseSubscribe extends BaseEntityWithUuidPrimaryKey<
  CourseSubscribe,
  'id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'subscriber_id',
      'course_id',
      'status',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer', nullable: true })
  course_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true })
  subscriber_id!: Scalar['integer'];

  @Property({ type: 'smallint' })
  status!: Scalar['smallint'];

  @ManyToOne({
    entity: () => User,
    inversedBy: (user) => user.subscribed_courses,
    nullable: true,
    joinColumn: 'subscriber_id',
  })
  subscriber!: User;

  @ManyToOne({
    entity: () => Course,
    inversedBy: (course) => course.subscribers,
    nullable: true,
    joinColumn: 'course_id',
  })
  course!: Course;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_course_subscribes,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_course_subscribes,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
