import { createApiFactory } from '@client/libs/axios/functions';
import {
  RatingCoursesApi,
  RatingCoursesApiRateRequest,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const ratingCourseMutation = async (
  requestParameters: RatingCoursesApiRateRequest
) => {
  return (await createApiFactory(RatingCoursesApi).rate(requestParameters))
    .data;
};

export const useRatingCourseMutation = () => {
  return useMutation({
    mutationFn: ratingCourseMutation,
  });
};
