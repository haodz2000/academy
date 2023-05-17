import { createApiFactory } from '@client/libs/axios/functions';
import {
  CoursesApi,
  CoursesApiListRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchCourses = async (
  requestParameters: CoursesApiListRequest
) => {
  return (await createApiFactory(CoursesApi).list(requestParameters)).data;
};

export const useCoursesQuery = (requestParameters: CoursesApiListRequest) => {
  return useQuery({
    queryKey: [QueryKeys.courses, requestParameters],
    queryFn: () => fetchCourses(requestParameters),
  });
};
