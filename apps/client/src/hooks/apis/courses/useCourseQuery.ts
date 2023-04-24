import { createApiFactory } from '@client/libs/axios/functions';
import {
  CoursesApi,
  CoursesApiFindOneRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchCourse = async (
  requestParameters: CoursesApiFindOneRequest
) => {
  return (await createApiFactory(CoursesApi).findOne(requestParameters)).data;
};

export const useCourseQuery = (requestParameters: CoursesApiFindOneRequest) => {
  return useQuery({
    queryKey: [QueryKeys.courses, requestParameters],
    queryFn: () => fetchCourse(requestParameters),
  });
};
