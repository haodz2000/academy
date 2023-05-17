import { createApiFactory } from '@client/libs/axios/functions';
import {
  LeariningRequestsApi,
  LeariningRequestsApiRejectRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const learningRequestRejectMutation = async (
  requestParameters: LeariningRequestsApiRejectRequest
) => {
  return (
    await createApiFactory(LeariningRequestsApi).reject(requestParameters)
  ).data;
};

export const useLearningRequestRejectMutation = () => {
  return useMutation({
    mutationFn: learningRequestRejectMutation,
  });
};
