import { createApiFactory } from '@client/libs/axios/functions';
import {
  LeariningRequestsApi,
  LeariningRequestsApiRequestRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const learningRequestMutation = async (
  requestParameters: LeariningRequestsApiRequestRequest
) => {
  return (
    await createApiFactory(LeariningRequestsApi).request(requestParameters)
  ).data;
};

export const useLearningRequestMutation = () => {
  return useMutation({
    mutationFn: learningRequestMutation,
  });
};
