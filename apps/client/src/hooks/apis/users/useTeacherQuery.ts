import { createApiFactory } from '@client/libs/axios/functions';
import { UsersApi } from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchTeachersQuery = async () => {
  return (await createApiFactory(UsersApi).getTeacher()).data;
};

export const useTeachersQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.teachers],
    queryFn: () => fetchTeachersQuery(),
  });
};
