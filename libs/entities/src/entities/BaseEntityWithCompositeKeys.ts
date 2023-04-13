import { BaseEntity, Property } from '@mikro-orm/core';
import { Maybe, Scalar } from '@libs/constants/interfaces/scalar';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export abstract class BaseEntityWithCompositeKeys<
  Entity extends object,
  Primary extends keyof Entity,
  Populate extends string = string
> extends BaseEntity<Entity, Primary, Populate> {
  @Property({ type: 'integer', nullable: true })
  created_by!: Maybe<'integer'>;

  @Property({ type: 'integer', nullable: true })
  updated_by!: Maybe<'integer'>;

  @Property()
  created_at: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();

  @Property({ nullable: true })
  deleted_at?: Scalar['timestamp'];
}
