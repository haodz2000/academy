import { User } from '@libs/entities/entities/User';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async getLoggedUser(id: User['id']): Promise<User> {
    return await this.userRepository.findOneOrFail(id, {
      populate: ['role', 'avatar'],
    });
  }
}
