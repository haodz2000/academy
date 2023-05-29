import { createApiFactory } from '@client/libs/axios/functions';
import { CoursesApi } from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchCourseLearnings = async () => {
  return (await createApiFactory(CoursesApi).findCourseLearnings()).data;
};

export const useCourseLearningsQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.courseLearnings],
    queryFn: () => fetchCourseLearnings(),
  });
};
