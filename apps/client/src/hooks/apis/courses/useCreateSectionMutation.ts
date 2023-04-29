import { createApiFactory } from '@client/libs/axios/functions';
import {
  SectionsApi,
  SectionsApiCreateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const createSectionMutation = async (
  requestParameters: SectionsApiCreateRequest
) => {
  return (await createApiFactory(SectionsApi).create(requestParameters)).data;
};

export const useCreateSectionMutation = () => {
  return useMutation({
    mutationFn: createSectionMutation,
  });
};
