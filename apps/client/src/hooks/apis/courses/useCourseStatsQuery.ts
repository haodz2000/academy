import { createApiFactory } from '@client/libs/axios/functions';
import { CoursesApi } from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const statsCourseQuery = async () => {
  return (await createApiFactory(CoursesApi).stats()).data;
};

export const useStatsCourseQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.statsCourses],
    queryFn: statsCourseQuery,
  });
};
