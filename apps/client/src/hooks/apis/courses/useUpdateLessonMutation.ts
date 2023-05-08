import { createApiFactory } from '@client/libs/axios/functions';
import {
  LessonsApi,
  LessonsApiUpdateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const updateLessonMutation = async (
  requestParameters: LessonsApiUpdateRequest
) => {
  return (await createApiFactory(LessonsApi).update(requestParameters)).data;
};

export const useUpdateLessonMutation = () => {
  return useMutation({
    mutationFn: updateLessonMutation,
  });
};
