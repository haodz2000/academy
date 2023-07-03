import { createApiFactory } from '@client/libs/axios/functions';
import {
  TeachingRequestsApi,
  TeachingRequestsApiFindOneRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const getTeachingRequest = async (
  requestParameters: TeachingRequestsApiFindOneRequest
) => {
  return (
    await createApiFactory(TeachingRequestsApi).findOne(requestParameters)
  ).data;
};

export const useTeachingRequestQuery = (
  requestParameters: TeachingRequestsApiFindOneRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.teachingRequest, requestParameters],
    queryFn: () => getTeachingRequest(requestParameters),
  });
};
