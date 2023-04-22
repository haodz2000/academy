import { AbilityFactory, AppAbility } from '../ability/ability.factory';
import { Reflector, REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { CHECK_POLICIES_KEY, PolicyHandler } from './ability.decorator';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '@libs/entities/entities/User';

@Injectable({ scope: Scope.REQUEST })
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
    @InjectRepository(User)
    private readonly accountRepository: EntityRepository<User>,
    @Inject(REQUEST) private request: Request
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    const id = this.request.user?.id;
    if (id) {
      try {
        const user = await this.accountRepository.findOneOrFail(
          { id },
          {
            populate: ['role', 'avatar'],
            disableIdentityMap: true,
          }
        );
        const ability = this.caslAbilityFactory.defineAbility(user);

        return policyHandlers.every((handler) =>
          this.execPolicyHandler(handler, ability)
        );
      } catch (error) {
        throw new ForbiddenException(error.message);
      }
    } else {
      return true;
    }
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
