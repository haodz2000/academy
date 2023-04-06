import { useMemo } from 'react';
import { createAxiosInstance, CreateAxiosInstanceOptions } from './functions';

export const useCreateAxiosInstance = (
  options?: CreateAxiosInstanceOptions
) => {
  return useMemo(() => {
    return createAxiosInstance(options);
  }, [options]);
};
