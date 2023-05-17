import { createApiFactory } from '@client/libs/axios/functions';
import {
  AssignmentsApi,
  AssignmentsApiCreateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const createAssignmentMutation = async (
  requestParameters: AssignmentsApiCreateRequest
) => {
  return (await createApiFactory(AssignmentsApi).create(requestParameters))
    .data;
};

export const useCreateAssignmentMutation = () => {
  return useMutation({
    mutationFn: createAssignmentMutation,
  });
};
