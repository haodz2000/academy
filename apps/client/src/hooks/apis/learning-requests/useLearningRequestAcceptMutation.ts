import { createApiFactory } from '@client/libs/axios/functions';
import {
  LeariningRequestsApi,
  LeariningRequestsApiAcceptRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const learningRequestAcceptMutation = async (
  requestParameters: LeariningRequestsApiAcceptRequest
) => {
  return (
    await createApiFactory(LeariningRequestsApi).accept(requestParameters)
  ).data;
};

export const useLearningRequestAcceptMutation = () => {
  return useMutation({
    mutationFn: learningRequestAcceptMutation,
  });
};
