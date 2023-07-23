import { createApiFactory } from '@client/libs/axios/functions';
import {
  CoursesApi,
  CoursesApiListCoursesMangeRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchManageCourses = async (
  requestParameters: CoursesApiListCoursesMangeRequest
) => {
  return (
    await createApiFactory(CoursesApi).listCoursesMange(requestParameters)
  ).data;
};

export const useCoursesManageQuery = (
  requestParameters: CoursesApiListCoursesMangeRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.coursesManage, requestParameters],
    queryFn: () => fetchManageCourses(requestParameters),
  });
};
