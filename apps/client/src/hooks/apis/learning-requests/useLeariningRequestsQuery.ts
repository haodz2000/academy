import { createApiFactory } from '@client/libs/axios/functions';
import {
  LeariningRequestsApi,
  LeariningRequestsApiListRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const getLearningRequests = async (
  requestParameters: LeariningRequestsApiListRequest
) => {
  return (await createApiFactory(LeariningRequestsApi).list(requestParameters))
    .data;
};

export const useLearningRequestsQuery = (
  requestParameters: LeariningRequestsApiListRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.learningRequests, requestParameters],
    queryFn: () => getLearningRequests(requestParameters),
  });
};
