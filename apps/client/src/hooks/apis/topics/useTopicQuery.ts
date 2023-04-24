import { createApiFactory } from '@client/libs/axios/functions';
import {
  TopicsApi,
  TopicsApiFindOneRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchTopic = async (params: TopicsApiFindOneRequest) => {
  return (await createApiFactory(TopicsApi).findOne(params)).data;
};

export const useTopicQuery = (params: TopicsApiFindOneRequest) => {
  return useQuery({
    queryKey: [QueryKeys.topic, params],
    queryFn: () => fetchTopic(params),
  });
};
