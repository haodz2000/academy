import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { User } from './User';
import { Lesson } from './Lesson';
import { BaseEntityWithUuidPrimaryKey } from './BaseEntityWithUuidPrimaryKey';

@Entity({ tableName: 'discussions' })
export class Discuss extends BaseEntityWithUuidPrimaryKey<Discuss, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'lesson_id',
      'description',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'text', nullable: true })
  description!: Scalar['text'];

  @Property({ type: 'integer' })
  lesson_id!: Scalar['integer'];

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_discusses,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_discusses,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @ManyToOne({
    entity: () => Lesson,
    inversedBy: (lesson) => lesson.discusses,
    nullable: true,
  })
  lesson!: Lesson;
}
