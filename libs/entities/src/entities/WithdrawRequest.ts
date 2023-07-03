import { WithdrawRequestStatus } from '@libs/constants/entities/Widthdraw';
import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntityWithUuidPrimaryKey } from './BaseEntityWithUuidPrimaryKey';
import { Maybe, Scalar } from '@libs/constants/interfaces/scalar';
import { User } from './User';
import { Transaction } from './Transaction';

@Entity({ tableName: 'withdraw_requests' })
export class WithdrawRequest extends BaseEntityWithUuidPrimaryKey<
  WithdrawRequest,
  'id'
> {
  get __visible(): Array<keyof this> {
    return [
      'id',
      'requester_id',
      'acceptor_id',
      'amount',
      'transaction_id',
      'status',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer' })
  requester_id!: Scalar['integer'];

  @Property({ type: 'integer', nullable: true })
  acceptor_id!: Maybe<'integer'>;

  @Property({ type: 'uuid', nullable: true })
  transaction_id: Maybe<'uuid'>;

  @Property({ type: 'integer', length: 11, unsigned: true })
  amount!: Scalar['integer'];

  @Property({ type: 'smallint' })
  status!: WithdrawRequestStatus;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.requested_withdraw_requests,
    joinColumn: 'requester_id',
  })
  requester!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_withdraw_requests,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_withdraw_requests,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    joinColumn: 'acceptor_id',
    inversedBy: (user) => user.accepted_withdraw_requests,
  })
  acceptor!: User;

  @OneToOne({
    entity: () => Transaction,
    inversedBy: (transaction) => transaction.withdraw_request,
    nullable: true,
    orphanRemoval: true,
    joinColumn: 'transaction_id',
  })
  transaction: Transaction | null;
}
