import { FC, PropsWithChildren, useEffect } from 'react';
import { useMeQuery } from '@client/hooks/apis/users/useMeQuery';
import { useAppDispatch } from '@client/stores';
import { setUser } from '@client/stores/slices/userSlice';

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const meQuery = useMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (meQuery.data) {
      dispatch(setUser(meQuery.data));
    }
  }, [dispatch, meQuery.data]);

  return <>{props.children}</>;
};
