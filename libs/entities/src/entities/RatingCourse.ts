import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { BaseEntityWithCompositeKeys } from './BaseEntityWithCompositeKeys';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { User } from './User';
import { Course } from './Course';

@Entity({ tableName: 'rating_courses' })
export class RatingCourse extends BaseEntityWithCompositeKeys<
  RatingCourse,
  'user_id' | 'course_id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'user_id',
      'course_id',
      'point',
      'comment',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer', nullable: true })
  user_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true })
  course_id!: Scalar['integer'];

  @Property({ type: 'integer', unsigned: true })
  point: Scalar['integer'];

  @Property({ type: 'varchar', length: 255, nullable: true })
  comment: Scalar['varchar'];

  [PrimaryKeyType]?: [number, number];

  @ManyToOne({
    primary: true,
    entity: () => User,
    inversedBy: (user) => user.rating_courses,
    nullable: true,
  })
  user!: User;

  @ManyToOne({
    primary: true,
    entity: () => Course,
    inversedBy: (course) => course.ratings,
    nullable: true,
  })
  course!: Course;
}
