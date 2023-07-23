/**
 * @see https://casl.js.org/v5/en/guide/subject-type-detection#custom-subject-type-detection
 */
export const detectSubjectType = (object: {
  __typename?: string;
}): IdSubject => {
  return (object.__typename as IdSubject) ?? IdSubject.All;
};
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  MongoQuery,
  RawRuleFrom,
} from '@casl/ability';
import { RuleIndexOptions } from '@casl/ability/dist/types/RuleIndex';
import { isObject } from 'lodash';
import { IdAction, IdSubject } from '@libs/constants/abilities';
import {
  CourseDetailResponse,
  CourseResponse,
  LearningRequestResponse,
  UserResponse,
} from '@libs/openapi-generator/generated';

export type AppAbilities = [
  IdAction,
  (
    | IdSubject
    | UserResponse
    | CourseResponse
    | CourseDetailResponse
    | LearningRequestResponse
  )
];

/** @see https://casl.js.org/v5/en/advanced/typescript#application-ability */
export type AppAbility = Ability<AppAbilities>;
export const AppAbility = Ability as AbilityClass<AppAbility>; // eslint-disable-line @typescript-eslint/no-redeclare

export type AppAbilityRule = RawRuleFrom<AppAbilities, MongoQuery>;

export interface RolePermission {
  action: string;
  subject: string;
}

export type DefinePermissions = (
  builder: AbilityBuilder<AppAbility>,
  user?: UserResponse
) => void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isResponseObject(
  object: any
): object is { __typename: IdSubject } {
  return isObject(object) && undefined !== (object as any).__typename;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export type DetectSubjectType = NonNullable<
  RuleIndexOptions<AppAbilities, MongoQuery>['detectSubjectType']
>;
