import { createApiFactory } from '@client/libs/axios/functions';
import { UsersApi } from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchPublicUsers = async () => {
  return (await createApiFactory(UsersApi)._public()).data;
};

export const usePublicUsersQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.userPublics],
    queryFn: () => fetchPublicUsers(),
  });
};
