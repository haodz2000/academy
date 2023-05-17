import { createApiFactory } from '@client/libs/axios/functions';
import {
  TeachingRequestsApi,
  TeachingRequestsApiListRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const getTeachingRequests = async (
  requestParameters: TeachingRequestsApiListRequest
) => {
  return (await createApiFactory(TeachingRequestsApi).list(requestParameters))
    .data;
};

export const useTeachingRequestsQuery = (
  requestParameters: TeachingRequestsApiListRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.teachingRequests, requestParameters],
    queryFn: () => getTeachingRequests(requestParameters),
  });
};
