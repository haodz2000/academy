import { createApiFactory } from '@client/libs/axios/functions';
import { UsersApi } from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchProfileUser = async () => {
  return (await createApiFactory(UsersApi).profile()).data;
};

export const useProfileUserQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.profile],
    queryFn: () => fetchProfileUser(),
  });
};
