import { createApiFactory } from '@client/libs/axios/functions';
import {
  TeachingRequestsApi,
  TeachingRequestsApiAcceptRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const teachingRequestAcceptMutation = async (
  requestParameters: TeachingRequestsApiAcceptRequest
) => {
  return (await createApiFactory(TeachingRequestsApi).accept(requestParameters))
    .data;
};

export const useTeachingRequestAcceptMutation = () => {
  return useMutation({
    mutationFn: teachingRequestAcceptMutation,
  });
};
