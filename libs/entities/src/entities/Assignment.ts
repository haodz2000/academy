import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from '@libs/entities/entities/BaseEntityWithSerialPrimaryKey';
import { User } from './User';
import { Lesson } from './Lesson';

@Entity({ tableName: 'assignments' })
export class Assignment extends BaseEntityWithSerialPrimaryKey<
  Assignment,
  'id'
> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'lesson_id',
      'title',
      'description',
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
  lesson_id!: Scalar['integer'];

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_assignments,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_assignments,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @ManyToOne({
    entity: () => Lesson,
    inversedBy: (lesson) => lesson.assignments,
    nullable: true,
  })
  lesson!: Lesson;
}
