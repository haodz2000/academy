import { createApiFactory } from '@client/libs/axios/functions';
import {
  CoursesApi,
  CoursesApiCreateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const createCourseMutation = async (
  requestParameters: CoursesApiCreateRequest
) => {
  return (await createApiFactory(CoursesApi).create(requestParameters)).data;
};

export const useCreateCourseMutation = () => {
  return useMutation({
    mutationFn: createCourseMutation,
  });
};
