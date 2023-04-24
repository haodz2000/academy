import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from '@libs/entities/entities/BaseEntityWithSerialPrimaryKey';
import { User } from './User';
import { Section } from './Section';

@Entity({ tableName: 'lessons' })
export class Lesson extends BaseEntityWithSerialPrimaryKey<Lesson, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'section_id',
      'title',
      'description',
      'link',
      'time',
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
  section_id!: Scalar['integer'];

  @Property({ type: 'varchar', length: 255 })
  link!: Scalar['varchar'];

  @Property({ type: 'integer' })
  time!: Scalar['integer'];

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_lessons,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_lessons,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @ManyToOne({
    entity: () => Section,
    inversedBy: (section) => section.lessons,
    nullable: true,
  })
  section!: Section;
}
