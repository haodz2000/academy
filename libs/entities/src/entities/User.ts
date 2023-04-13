import { Category } from './Category';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntityWithSerialPrimaryKey } from './BaseEntityWithSerialPrimaryKey';
import { Maybe, Scalar } from '@libs/constants/interfaces/scalar';
import { StoredFile } from '@libs/entities/entities/StoredFile';
import { Role } from './Role';
import { Topic } from './Topic';

@Entity({ tableName: 'users' })
export class User extends BaseEntityWithSerialPrimaryKey<User, 'id'> {
  @Property({ persist: false })
  get __visible(): Array<keyof this> {
    return [
      'id',
      'name',
      'email',
      'google_id',
      'role_id',
      'avatar_id',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
      'deleted_at',
    ];
  }

  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Property({ type: 'varchar', length: 255 })
  email!: Scalar['varchar'];

  @Property({ type: 'varchar', length: 255, nullable: true })
  google_id!: Maybe<'varchar'>;

  @Property({ type: 'integer' })
  role_id!: Scalar['integer'];

  @Property({ type: 'uuid', nullable: true })
  avatar_id: Maybe<'uuid'>;

  @ManyToOne({
    entity: () => Role,
    nullable: true,
    inversedBy: (role) => role.users,
    joinColumn: 'role_id',
  })
  role!: Role;

  @ManyToOne({
    entity: () => StoredFile,
    nullable: true,
    inversedBy: (storedFile) => storedFile.user_avatar,
    joinColumn: 'avatar_id',
  })
  avatar!: StoredFile;

  @OneToMany({
    entity: () => StoredFile,
    mappedBy: (storedFile) => storedFile.creator,
  })
  created_stored_files = new Collection<StoredFile>(this);

  @OneToMany({
    entity: () => StoredFile,
    mappedBy: (storedFile) => storedFile.updater,
  })
  updated_stored_files = new Collection<StoredFile>(this);

  @OneToMany({
    entity: () => Role,
    mappedBy: (role) => role.creator,
  })
  created_roles = new Collection<Role>(this);

  @OneToMany({
    entity: () => Role,
    mappedBy: (role) => role.updater,
  })
  updated_roles = new Collection<Role>(this);

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (User) => User.created_users,
    joinColumn: 'created_by',
  })
  creator!: User;

  @ManyToOne({
    entity: () => User,
    nullable: true,
    inversedBy: (User) => User.updated_users,
    joinColumn: 'updated_by',
  })
  updater!: User;

  @OneToMany({
    entity: () => User,
    mappedBy: (User) => User.creator,
  })
  created_users = new Collection<User>(this);

  @OneToMany({
    entity: () => User,
    mappedBy: (User) => User.updater,
  })
  updated_users = new Collection<User>(this);

  @OneToMany({
    entity: () => Category,
    mappedBy: (category) => category.creator,
  })
  created_categories = new Collection<Category>(this);

  @OneToMany({
    entity: () => Category,
    mappedBy: (category) => category.updater,
  })
  updated_categories = new Collection<Category>(this);

  @OneToMany({
    entity: () => Topic,
    mappedBy: (topic) => topic.creator,
  })
  created_topics = new Collection<Topic>(this);

  @OneToMany({
    entity: () => Topic,
    mappedBy: (topic) => topic.updater,
  })
  updated_topics = new Collection<Topic>(this);
}
