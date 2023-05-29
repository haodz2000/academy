import { RoleType } from '@libs/constants/entities/Role';

export const getRoleType = (type: number | undefined | null) => {
  switch (type) {
    case RoleType.Admin:
      return 'admin';
    case RoleType.User:
      return 'user';
    default:
      return 'user';
  }
};
