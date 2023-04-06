import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { RoleType } from '@libs/constants/entities/Role';
import { Scalar } from '@libs/constants/interfaces/scalar';
import { BaseEntityWithSerialPrimaryKey } from '@libs/entities/entities/BaseEntityWithSerialPrimaryKey';
import { User } from './User';

@Entity({ tableName: 'roles' })
export class Role extends BaseEntityWithSerialPrimaryKey<Role, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return ['id', 'name', 'type', 'created_at', 'updated_at', 'deleted_at'];
  }

  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Unique()
  @Property({ type: 'smallint' })
  type!: RoleType;

  @OneToMany({ entity: () => User, mappedBy: (user) => user.role })
  users = new Collection<User>(this);

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (User) => User.created_roles,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (User) => User.updated_roles,
    joinColumn: 'updated_by',
  })
  updater!: User;
}
