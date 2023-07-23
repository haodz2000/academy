import { createApiFactory } from '@client/libs/axios/functions';
import {
  RatingCoursesApi,
  RatingCoursesApiListRequest,
} from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchRatingCoursesQuery = async (
  requestParameters: RatingCoursesApiListRequest
) => {
  return (await createApiFactory(RatingCoursesApi).list(requestParameters))
    .data;
};

export const useRatingCoursesQuery = (
  requestParameters: RatingCoursesApiListRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.ratingCourses, requestParameters],
    queryFn: () => fetchRatingCoursesQuery(requestParameters),
  });
};
