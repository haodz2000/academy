import { createApiFactory } from '@client/libs/axios/functions';
import { CategoriesApi } from '@libs/openapi-generator/generated/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';

export const fetchCategories = async () => {
  return (await createApiFactory(CategoriesApi).list()).data;
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.categories],
    queryFn: () => fetchCategories(),
  });
};
