import { AuthApi } from '@libs/openapi-generator/generated';
import { useQuery } from '@tanstack/react-query';
import { createApiFactory } from '@client/libs/axios/functions';
import { QueryKeys } from '@client/hooks/apis/queryKeys';
import { AxiosInstance } from 'axios';

export const fetchMe = async (
  axiosInstance: AxiosInstance | undefined | null = null
) => {
  return (
    await createApiFactory(AuthApi, axiosInstance)
      .me()
      .then((res) => res.data)
  ).data;
};

export const useMeQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.me],
    queryFn: () => fetchMe(),
  });
};
