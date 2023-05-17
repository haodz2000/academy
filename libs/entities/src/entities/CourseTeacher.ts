import { StatusCourseTeacher } from './../../../constants/src/entities/CourseTeacher';
import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { BaseEntityWithCompositeKeys } from '@libs/entities/entities/BaseEntityWithCompositeKeys';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { Course } from './Course';
import { User } from './User';

@Entity({ tableName: 'course_teachers' })
export class CourseTeacher extends BaseEntityWithCompositeKeys<
  CourseTeacher,
  'course_id' | 'teacher_id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'teacher_id',
      'course_id',
      'status',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer', nullable: true })
  teacher_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true })
  course_id!: Scalar['integer'];

  @Property({ type: 'smallint' })
  status!: StatusCourseTeacher;

  [PrimaryKeyType]?: [number, number];

  @ManyToOne({
    primary: true,
    entity: () => User,
    inversedBy: (user) => user.course_teachers,
    joinColumn: 'teacher_id',
    nullable: true,
  })
  teacher!: User;

  @ManyToOne({
    primary: true,
    entity: () => Course,
    inversedBy: (course) => course.course_teachers,
    nullable: true,
  })
  course!: Course;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_course_teachers,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_course_teachers,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
