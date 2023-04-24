import { createApiFactory } from '@client/libs/axios/functions';
import { CoursesApi } from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchCourses = async () => {
  return (await createApiFactory(CoursesApi).list()).data;
};

export const useCoursesQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.courses],
    queryFn: () => fetchCourses(),
  });
};
