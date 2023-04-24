import { createApiFactory } from '@client/libs/axios/functions';
import {
  TopicsApi,
  TopicsApiFindAllRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchTopics = async (
  requestParameters: TopicsApiFindAllRequest
) => {
  return (await createApiFactory(TopicsApi).findAll(requestParameters)).data;
};

export const useTopicsQuery = (requestParameters: TopicsApiFindAllRequest) => {
  return useQuery({
    queryKey: [QueryKeys.topics, requestParameters],
    queryFn: () => fetchTopics(requestParameters),
  });
};
