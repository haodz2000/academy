import { UserResponse } from './../responses/user.response';
import { IdSubject } from '@libs/constants/abilities';
import { User } from '@libs/entities/entities/User';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { UserBasicResponse } from '../responses/user-basic.response';
import { StoredFileTransformer } from '@server/modules/stored-files/transformers/stored-file.transformer';
import { RoleTransformer } from '@server/modules/roles/transformers/role.transformer';
import { UserPublicResponse } from '../responses/user-public.response';
import { WalletTransformer } from '@server/modules/wallets/transformers/wallet.transformer';
import { TeacherResponse } from '../responses/teacher.response';
import { CourseTransformer } from '@server/modules/courses/transformers/course.transformer';

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
      wallet: user.wallet
        ? WalletTransformer.toWalletTransformer(user.wallet)
        : null,
    };
  }

  static toUserPublic(user: User): UserPublicResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
        ? StoredFileTransformer.toBasicStoredFileResponse(user.avatar)
        : null,
      __typename: IdSubject.Users,
    };
  }
  static toTeacherResponse(user: User): TeacherResponse {
    return {
      ...this.toUserResponse(user),
      courses: user.course_manages
        .getItems()
        .map((i) => CourseTransformer.toCourseResponse(i)),
    };
  }
}
