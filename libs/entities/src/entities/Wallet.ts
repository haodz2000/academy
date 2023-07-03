import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Maybe, Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from './BaseEntityWithSerialPrimaryKey';
import { User } from './User';
import { Transaction } from './Transaction';

@Entity({ tableName: 'wallets' })
export class Wallet extends BaseEntityWithSerialPrimaryKey<Wallet, 'id'> {
  get __visible(): Array<keyof this> {
    return [
      'id',
      'balance',
      'user_id',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'smallint', default: 1 })
  type!: Scalar['smallint'];

  @Property({ type: 'integer', nullable: true })
  user_id: Maybe<'integer'>;

  @Property({ type: 'float', default: 0 })
  balance!: Scalar['float'];

  @OneToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (user) => user.wallet,
    joinColumn: 'user_id',
  })
  user: User;

  @OneToMany({
    entity: () => Transaction,
    mappedBy: (data) => data.receiverWallet,
  })
  received_transactions = new Collection<Transaction>(this);

  @OneToMany({
    entity: () => Transaction,
    mappedBy: (data) => data.senderWallet,
  })
  sent_transactions = new Collection<Transaction>(this);
}
