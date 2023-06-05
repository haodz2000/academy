import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { User } from './User';
import { BaseEntityWithSerialPrimaryKey } from './BaseEntityWithSerialPrimaryKey';
import {
  NotificationPayload,
  NotificationRead,
  NotificationStatus,
  NotificationType,
} from '@libs/constants/entities/Notification';

@Entity({ tableName: 'notifications' })
export class Notification extends BaseEntityWithSerialPrimaryKey<
  Notification,
  'id'
> {
  get __visible(): Array<keyof this> {
    return [
      'id',
      'user_id',
      'payload',
      'fcm_message',
      'type',
      'status',
      'read',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'int' })
  user_id!: Scalar['integer'];

  @Property({ type: 'jsonb', default: '{}' })
  payload!: NotificationPayload;

  @Property({ type: 'jsonb', default: '{}' })
  fcm_message!: Scalar['jsonb'];

  @Property({ type: 'smallint' })
  type!: NotificationType;

  @Property({ type: 'smallint', default: NotificationStatus.Pending })
  status!: NotificationStatus;

  @Property({ type: 'smallint', default: NotificationRead.UnRead })
  read!: NotificationRead;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.notifications,
    joinColumn: 'user_id',
  })
  user!: User;
}
