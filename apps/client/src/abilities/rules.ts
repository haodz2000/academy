import { AbilityBuilder } from '@casl/ability';
import { AppAbility, AppAbilityRule, DefinePermissions } from './types';
import { IdAction, IdSubject } from '@libs/constants/abilities';
import { UserResponse } from '@libs/openapi-generator/generated';
export const userTypePermissions: Record<'admin' | 'user', DefinePermissions> =
  {
    user({ can, cannot }, user) {
      can(IdAction.Read, IdSubject.All);
      can(IdAction.Update, IdSubject.Users, { id: user?.id });
      can(IdAction.Read, IdSubject.Courses, { administrator_id: user?.id });
      can(IdAction.Update, IdSubject.Courses, { administrator_id: user?.id });
      cannot(IdAction.Update, IdSubject.Users, ['type', 'email', 'google_id']);
      can(IdAction.Manage, IdSubject.LearningRequest, {
        course: { administrator_id: user?.id },
      });
      can(IdAction.Read, IdSubject.TeachingRequests, {
        requester_id: user?.id,
      });
      can(IdAction.Read, IdSubject.LearningRequest, {
        requester_id: user?.id,
      });
    },
    admin({ can }) {
      can(IdAction.Manage, IdSubject.All);
    },
  };

export function abilityBuilderFromUser(
  user?: UserResponse
): AbilityBuilder<AppAbility> {
  return new AbilityBuilder(AppAbility);
}

/**
 * Return a function that determines if a rule includes the specified action and subject.
 */
export function rulePredicate(
  action: IdAction,
  subject: IdSubject
): (rule: AppAbilityRule) => boolean {
  return (rule: AppAbilityRule): boolean => {
    return rule.action === action && rule.subject === subject;
  };
}
