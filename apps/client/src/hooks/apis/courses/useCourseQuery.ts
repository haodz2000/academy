import { createApiFactory } from '@client/libs/axios/functions';
import {
  CoursesApi,
  CoursesApiFindOneRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';
import { AxiosInstance } from 'axios';

export const fetchCourse = async (
  requestParameters: CoursesApiFindOneRequest,
  axiosInstance: AxiosInstance | undefined | null = null
) => {
  return (
    await createApiFactory(CoursesApi, axiosInstance).findOne(requestParameters)
  ).data;
};

export const useCourseQuery = (requestParameters: CoursesApiFindOneRequest) => {
  return useQuery({
    queryKey: [QueryKeys.course, requestParameters],
    queryFn: () => fetchCourse(requestParameters),
  });
};
