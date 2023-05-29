import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { User } from '@libs/entities/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { RoleType } from '@libs/constants/entities/Role';
import { Pagination } from '@libs/utils/responses';
import { FilterUserQueryDto } from './dtos/filter-user-query.dto';
import { UserUpdateDto } from './dtos/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepostiory: EntityRepository<User>,
    @Inject(REQUEST) private request: Request
  ) {}

  async me(): Promise<User> {
    return await this.userRepostiory.findOneOrFail({
      id: this.request.user.id,
    });
  }

  async list(option: FilterUserQueryDto): Promise<{
    data: User[];
    pagination: Pagination;
  }> {
    const where: FilterQuery<User> = {};
    where.role = {
      type: RoleType.User,
    };
    if (option.q) {
      where.$or = [
        {
          name: { $ilike: option.q },
        },
        {
          email: { $ilike: option.q },
        },
      ];
    }
    const [users, count] = await this.userRepostiory.findAndCount(where, {
      limit: option.limit,
      offset: (option.page - 1) * option.limit || 0,
      populate: ['avatar', 'role'],
    });
    return {
      data: users,
      pagination: {
        limit: option.limit,
        total: count,
        lastPage: Math.ceil(count / option.limit),
        page: option.page,
      },
    };
  }

  async public(): Promise<{
    data: User[];
    pagination: Pagination;
  }> {
    const [users, count] = await this.userRepostiory.findAndCount(
      {
        role: { type: RoleType.User },
      },
      {
        limit: 46,
        fields: ['name', 'id', 'avatar', 'email'],
      }
    );
    return {
      data: users,
      pagination: {
        limit: 46,
        total: count,
        lastPage: 1,
        page: 1,
      },
    };
  }

  async update(data: UserUpdateDto): Promise<User> {
    const user = await this.userRepostiory.findOneOrFail(this.request.user.id, {
      populate: ['avatar', 'role'],
    });
    wrap(user).assign({
      ...data,
    });
    await this.userRepostiory.persistAndFlush(user);
    return user;
  }

  async profile(): Promise<User> {
    return await this.userRepostiory.findOneOrFail(this.request.user.id, {
      populate: ['avatar', 'role'],
    });
  }
}
