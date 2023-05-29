import { FC, PropsWithChildren, useEffect } from 'react';
import { useMeQuery } from '@client/hooks/apis/users/useMeQuery';
import { useAppDispatch, useAppSelector } from '@client/stores';
import { setUser } from '@client/stores/slices/userSlice';
import { AppAbilityContext, defineAbilityFor } from '@client/abilities';

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const user = useAppSelector((state) => state.user.user);
  const meQuery = useMeQuery();
  const dispatch = useAppDispatch();
  const ability = defineAbilityFor(meQuery.data?.data);

  useEffect(() => {
    if (meQuery.data?.data) {
      dispatch(setUser(meQuery.data?.data));
    }
  }, [dispatch, meQuery?.data]);

  return (
    <>
      {!user ? (
        props.children
      ) : (
        <AppAbilityContext.Provider value={ability}>
          {props.children}
        </AppAbilityContext.Provider>
      )}
    </>
  );
};
