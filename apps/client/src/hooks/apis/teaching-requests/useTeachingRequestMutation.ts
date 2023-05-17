import { createApiFactory } from '@client/libs/axios/functions';
import {
  TeachingRequestsApi,
  TeachingRequestsApiRequestRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const teachingRequestMutation = async (
  requestParameters: TeachingRequestsApiRequestRequest
) => {
  return (
    await createApiFactory(TeachingRequestsApi).request(requestParameters)
  ).data;
};

export const useTeachingRequestMutation = () => {
  return useMutation({
    mutationFn: teachingRequestMutation,
  });
};
