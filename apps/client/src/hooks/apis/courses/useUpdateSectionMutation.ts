import { createApiFactory } from '@client/libs/axios/functions';
import {
  SectionsApi,
  SectionsApiUpdateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const updateSectionMutation = async (
  requestParameters: SectionsApiUpdateRequest
) => {
  return (await createApiFactory(SectionsApi).update(requestParameters)).data;
};

export const useUpdateSectionMutation = () => {
  return useMutation({
    mutationFn: updateSectionMutation,
  });
};
