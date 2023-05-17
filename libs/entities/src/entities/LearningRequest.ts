import { StatusLearningRequest } from './../../../constants/src/entities/LearningRequest';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { User } from './User';
import { BaseEntityWithUuidPrimaryKey } from './BaseEntityWithUuidPrimaryKey';
import { Course } from './Course';

@Entity({ tableName: 'learning_requests' })
export class LearningRequest extends BaseEntityWithUuidPrimaryKey<
  LearningRequest,
  'id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'requester_id',
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
  requester_id!: Scalar['integer'];

  @Property({ type: 'smallint' })
  status!: StatusLearningRequest;

  @ManyToOne({
    entity: () => User,
    inversedBy: (user) => user.learning_requests,
    nullable: true,
    joinColumn: 'requester_id',
  })
  requester!: User;

  @ManyToOne({
    entity: () => Course,
    inversedBy: (course) => course.learning_requests,
    nullable: true,
    joinColumn: 'course_id',
  })
  course!: Course;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_learning_requests,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_learning_requests,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
