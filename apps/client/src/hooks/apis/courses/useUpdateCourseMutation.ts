import { createApiFactory } from '@client/libs/axios/functions';
import {
  CoursesApi,
  CoursesApiUpdateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const updateCourseMutation = async (
  requestParameters: CoursesApiUpdateRequest
) => {
  return (await createApiFactory(CoursesApi).update(requestParameters)).data;
};

export const useUpdateCourseMutation = () => {
  return useMutation({
    mutationFn: updateCourseMutation,
  });
};
