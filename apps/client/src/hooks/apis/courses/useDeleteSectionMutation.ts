import { createApiFactory } from '@client/libs/axios/functions';
import {
  SectionsApi,
  SectionsApiDeleteRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const deleteSectionMutation = async (
  requestParameters: SectionsApiDeleteRequest
) => {
  return (await createApiFactory(SectionsApi)._delete(requestParameters)).data;
};

export const useDeleteSectionMutation = () => {
  return useMutation({
    mutationFn: deleteSectionMutation,
  });
};
