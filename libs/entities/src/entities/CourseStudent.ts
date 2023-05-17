import { StatusCourseStudent } from './../../../constants/src/entities/CourseStudent';
import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { BaseEntityWithCompositeKeys } from '@libs/entities/entities/BaseEntityWithCompositeKeys';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { Course } from './Course';
import { User } from './User';

@Entity({ tableName: 'course_students' })
export class CourseStudent extends BaseEntityWithCompositeKeys<
  CourseStudent,
  'course_id' | 'student_id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'student_id',
      'course_id',
      'status',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer', nullable: true })
  student_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true })
  course_id!: Scalar['integer'];

  @Property({ type: 'smallint' })
  status!: StatusCourseStudent;

  [PrimaryKeyType]?: [number, number];

  @ManyToOne({
    primary: true,
    entity: () => User,
    inversedBy: (user) => user.course_students,
    joinColumn: 'student_id',
    nullable: true,
  })
  student!: User;

  @ManyToOne({
    primary: true,
    entity: () => Course,
    inversedBy: (course) => course.course_students,
    nullable: true,
  })
  course!: Course;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_course_students,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_course_students,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
