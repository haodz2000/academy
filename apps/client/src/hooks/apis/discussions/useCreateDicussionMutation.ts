import { createApiFactory } from '@client/libs/axios/functions';
import {
  DiscussionsApi,
  DiscussionsApiCreateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const createDiscussionMutation = async (
  requestParameters: DiscussionsApiCreateRequest
) => {
  return (await createApiFactory(DiscussionsApi).create(requestParameters))
    .data;
};

export const useCreateDiscussionMutation = () => {
  return useMutation({
    mutationFn: createDiscussionMutation,
  });
};
