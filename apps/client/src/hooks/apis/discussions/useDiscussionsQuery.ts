import { createApiFactory } from '@client/libs/axios/functions';
import {
  DiscussionsApi,
  DiscussionsApiListRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchDiscussions = async (
  requestParameters: DiscussionsApiListRequest
) => {
  return (await createApiFactory(DiscussionsApi).list(requestParameters)).data;
};

export const useDiscussionsQuery = (
  requestParameters: DiscussionsApiListRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.discussions, requestParameters],
    queryFn: () => fetchDiscussions(requestParameters),
  });
};
