import { createApiFactory } from '@client/libs/axios/functions';
import {
  AssignmentsApi,
  AssignmentsApiListRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchAssignments = async (
  requestParameters: AssignmentsApiListRequest
) => {
  return (await createApiFactory(AssignmentsApi).list(requestParameters)).data;
};

export const useAssignmentsQuery = (
  requestParameters: AssignmentsApiListRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.assignments, requestParameters],
    queryFn: () => fetchAssignments(requestParameters),
  });
};
