import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntityWithSerialPrimaryKey } from './BaseEntityWithSerialPrimaryKey';
import { Maybe, Scalar } from '@libs/constants/interfaces/scalar';
import { Wallet } from './Wallet';
import { Transaction } from './Transaction';
import { User } from './User';

@Entity({ tableName: 'wallet_balances' })
export class WalletBalance extends BaseEntityWithSerialPrimaryKey<
  WalletBalance,
  'id'
> {
  get __visible(): Array<keyof this> {
    return [
      'id',
      'amount',
      'owner_balance',
      'wallet_id',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'double' })
  amount = 0;

  @Property({ type: 'double' })
  owner_balance = 0;

  @Property({ type: 'integer' })
  wallet_id!: Scalar['integer'];

  @Property({ type: 'uuid', nullable: true })
  transaction_id: Maybe<'uuid'>;

  @ManyToOne({
    entity: () => Wallet,
    nullable: true,
    inversedBy: (wallet) => wallet.balances,
    joinColumn: 'wallet_id',
  })
  wallet!: Wallet;

  @ManyToOne({
    entity: () => Transaction,
    nullable: true,
    inversedBy: (transaction) => transaction.balances,
    joinColumn: 'transaction_id',
  })
  transaction!: Transaction;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.created_wallet_balance,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.updated_wallet_balance,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
