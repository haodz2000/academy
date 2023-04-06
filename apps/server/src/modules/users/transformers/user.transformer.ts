import { UserResponse } from './../responses/user.response';
import { IdSubject } from '@libs/constants/abilities';
import { User } from '@libs/entities/entities/User';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { UserBasicResponse } from '../responses/user-basic.response';
import { StoredFileTransformer } from '@server/modules/stored-files/transformers/stored-file.transformer';
import { RoleTransformer } from '@server/modules/roles/transformers/role.transformer';

export class UserTransformer extends BaseResponseTransformer {
  static toUserBasicResponse(user: User): UserBasicResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(user),
      creator: null,
      updater: null,
      __typename: IdSubject.Users,
    };
  }

  static toUserResponse(user: User): UserResponse {
    return {
      ...UserTransformer.toUserBasicResponse(user),
      avatar: user.avatar
        ? StoredFileTransformer.toBasicStoredFileResponse(user.avatar)
        : null,
      role: RoleTransformer.toRoleResponse(user.role),
    };
  }
}
