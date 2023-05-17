import { createApiFactory } from '@client/libs/axios/functions';
import {
  TeachingRequestsApi,
  TeachingRequestsApiRejectRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const teachingRequestRejectMutation = async (
  requestParameters: TeachingRequestsApiRejectRequest
) => {
  return (await createApiFactory(TeachingRequestsApi).reject(requestParameters))
    .data;
};

export const useTeachingRequestRejectMutation = () => {
  return useMutation({
    mutationFn: teachingRequestRejectMutation,
  });
};
