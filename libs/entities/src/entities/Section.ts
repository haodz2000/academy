import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from '@libs/entities/entities/BaseEntityWithSerialPrimaryKey';
import { User } from './User';
import { Course } from './Course';
import { Lesson } from './Lesson';

@Entity({ tableName: 'sections' })
export class Section extends BaseEntityWithSerialPrimaryKey<Section, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'course_id',
      'title',
      'description',
      'order',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'varchar', length: 255 })
  title!: Scalar['varchar'];

  @Property({ type: 'text', nullable: true })
  description!: Scalar['text'];

  @Property({ type: 'integer' })
  course_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true, default: 0 })
  order!: Scalar['integer'];

  @ManyToOne({
    entity: () => Course,
    inversedBy: (course) => course.sections,
    nullable: true,
  })
  course!: Course;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_sections,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_sections,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @OneToMany({
    entity: () => Lesson,
    mappedBy: (lesson) => lesson.section,
  })
  lessons = new Collection<Lesson>(this);
}
