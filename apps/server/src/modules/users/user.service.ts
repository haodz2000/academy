import { EntityRepository } from '@mikro-orm/core';
import { User } from '@libs/entities/entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

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
}
