import { createApiFactory } from '@client/libs/axios/functions';
import {
  LeariningRequestsApi,
  LeariningRequestsApiFindOneRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const getLearningRequest = async (
  requestParameters: LeariningRequestsApiFindOneRequest
) => {
  return (
    await createApiFactory(LeariningRequestsApi).findOne(requestParameters)
  ).data;
};

export const useLearningRequestQuery = (
  requestParameters: LeariningRequestsApiFindOneRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.learningRequest, requestParameters],
    queryFn: () => getLearningRequest(requestParameters),
  });
};
