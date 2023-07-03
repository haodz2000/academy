import {
  TransactionStatus,
  TransactionType,
} from '@libs/constants/entities/Transaction';
import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntityWithUuidPrimaryKey } from './BaseEntityWithUuidPrimaryKey';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { Wallet } from './Wallet';
import { User } from './User';
import { WithdrawRequest } from './WithdrawRequest';

@Entity({ tableName: 'transactions' })
export class Transaction extends BaseEntityWithUuidPrimaryKey<
  Transaction,
  'id'
> {
  get __visible(): Array<keyof this> {
    return [
      'id',
      'to_wallet_id',
      'from_wallet_id',
      'amount',
      'message',
      'type',
      'status',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'integer', nullable: true })
  from_wallet_id: Scalar['integer']; // NULL if admin deposit money for user

  @Property({ type: 'integer', nullable: true })
  to_wallet_id: Scalar['integer']; // NULL if user withdraw money

  @Property({ type: 'integer', length: 11, unsigned: true })
  amount!: Scalar['integer'];

  @Property({ type: 'text' })
  message!: Scalar['text'];

  @Property({ type: 'smallint', unsigned: true })
  type: TransactionType;

  @Property({ type: 'smallint', unsigned: true })
  status: TransactionStatus;

  @OneToOne({
    entity: () => WithdrawRequest,
    mappedBy: (withdrawRequest) => withdrawRequest.transaction,
  })
  withdraw_request!: WithdrawRequest;

  @ManyToOne({
    entity: () => Wallet,
    nullable: true,
    inversedBy: (wallet) => wallet.received_transactions,
    joinColumn: 'to_wallet_id',
  })
  receiverWallet: Wallet | null;

  @ManyToOne({
    entity: () => Wallet,
    nullable: true,
    inversedBy: (wallet) => wallet.sent_transactions,
    joinColumn: 'from_wallet_id',
  })
  senderWallet: Wallet | null;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_transactions,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_transactions,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
