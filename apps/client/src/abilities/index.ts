import { AbilityOptions, MongoQuery } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
import { abilityBuilderFromUser, userTypePermissions } from './rules';
import { AppAbilities, AppAbility } from './types';
import { getRoleType } from '@client/utils/roles';
import { detectSubjectType } from '@client/abilities/functions';
import { UserResponse } from '@libs/openapi-generator/generated';

const ABILITY_OPTIONS: AbilityOptions<AppAbilities, MongoQuery> = {
  detectSubjectType,
};

export const AppAbilityContext = createContext<AppAbility>(new AppAbility());

/** @see https://github.com/stalniy/casl/tree/master/packages/casl-react#bind-can-to-a-particular-ability-instance */
export const Can = createContextualCan<AppAbility>(AppAbilityContext.Consumer);

export function defineAbilityFor(user?: UserResponse): AppAbility {
  const builder = abilityBuilderFromUser(user);
  userTypePermissions[getRoleType(user?.role?.type)](builder, user);

  return builder.build(ABILITY_OPTIONS);
}
