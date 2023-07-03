import { Entity, OneToOne, Property, Unique } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from '@libs/entities/entities/BaseEntityWithSerialPrimaryKey';
import { Course } from './Course';

@Entity({ tableName: 'course_prices' })
export class CoursePrice extends BaseEntityWithSerialPrimaryKey<
  CoursePrice,
  'id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'course_id',
      'price',
      'discount',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer' })
  @Unique()
  course_id!: Scalar['integer'];

  @Property({ type: 'float', nullable: true, default: 0 })
  price!: Scalar['float'];

  @Property({ type: 'integer', nullable: true, default: 0 })
  discount!: Scalar['integer'];

  @OneToOne({
    entity: () => Course,
    inversedBy: (course) => course.course_price,
    nullable: true,
  })
  course!: Course;
}
