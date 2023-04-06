import { Role } from '@libs/entities/entities/Role';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { RoleResponse } from '@server/modules/roles/responses/role.response';
import { IdSubject } from '@libs/constants/abilities';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';

export class RoleTransformer extends BaseResponseTransformer {
  static toRoleResponse(role: Role): RoleResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(role),
      __typename: IdSubject.Roles,
      creator: role.creator
        ? UserTransformer.toUserBasicResponse(role.creator)
        : null,
      updater: role.updater
        ? UserTransformer.toUserBasicResponse(role.updater)
        : null,
    };
  }
}
