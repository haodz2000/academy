import { createApiFactory } from '@client/libs/axios/functions';
import {
  LessonsApi,
  LessonsApiDeleteRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const deleteLessonMutation = async (
  requestParameters: LessonsApiDeleteRequest
) => {
  return (await createApiFactory(LessonsApi)._delete(requestParameters)).data;
};

export const useDeleteLessonMutation = () => {
  return useMutation({
    mutationFn: deleteLessonMutation,
  });
};
