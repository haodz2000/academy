import { useAppSelector } from '@client/stores';
import { RoleType } from '@libs/constants/entities/Role';

export const useIsAdmin = (): boolean => {
  const account = useAppSelector((state) => state.user.user);
  return account?.role?.type === RoleType.Admin;
};
