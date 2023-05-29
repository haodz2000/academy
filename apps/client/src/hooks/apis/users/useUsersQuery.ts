import { createApiFactory } from '@client/libs/axios/functions';
import {
  UsersApi,
  UsersApiListRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchUsers = async (params: UsersApiListRequest) => {
  return (await createApiFactory(UsersApi).list(params)).data;
};

export const useUsersQuery = (params: UsersApiListRequest) => {
  return useQuery({
    queryKey: [QueryKeys.users, params],
    queryFn: () => fetchUsers(params),
  });
};
