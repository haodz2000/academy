import { createApiFactory } from '@client/libs/axios/functions';
import {
  UsersApiUpdateRequest,
  UsersApi,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const profileUpdateMutation = async (
  requestParameters: UsersApiUpdateRequest
) => {
  return (await createApiFactory(UsersApi).update(requestParameters)).data;
};

export const useProfileUpdateMutation = () => {
  return useMutation({
    mutationFn: profileUpdateMutation,
  });
};
