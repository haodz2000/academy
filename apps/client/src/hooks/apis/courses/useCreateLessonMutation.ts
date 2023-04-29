import { createApiFactory } from '@client/libs/axios/functions';
import {
  LessonsApi,
  LessonsApiCreateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const createLessonMutation = async (
  requestParameters: LessonsApiCreateRequest
) => {
  return (await createApiFactory(LessonsApi).create(requestParameters)).data;
};

export const useCreateLessonMutation = () => {
  return useMutation({
    mutationFn: createLessonMutation,
  });
};
