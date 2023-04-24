import { SetMetadata } from '@nestjs/common';

import { AppAbility } from './ability.factory';
import { IdAction, IdSubject } from '@libs/constants/abilities';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

export class ManageAllPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(IdAction.Manage, IdSubject.All);
  }
}
