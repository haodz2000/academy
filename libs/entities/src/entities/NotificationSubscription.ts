import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from './BaseEntityWithSerialPrimaryKey';
import { NotificationSubscriptionStatus } from '@libs/constants/entities/NotificationSubscription';
import { User } from './User';

@Entity({ tableName: 'notification_subscriptions' })
export class NotificationSubscription extends BaseEntityWithSerialPrimaryKey<
  NotificationSubscription,
  'id'
> {
  get __visible(): Array<keyof this> {
    return [
      'id',
      'user_id',
      'status',
      'token',
      'last_active',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'int' })
  user_id!: Scalar['integer'];

  @Property({ type: 'text' })
  token!: Scalar['text'];

  @Property({ type: 'timestamp', default: 'now()' })
  last_active!: Scalar['datetime'];

  @Property({ type: 'smallint' })
  status!: NotificationSubscriptionStatus;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.notification_subscriptions,
    joinColumn: 'user_id',
  })
  user!: User;
}
