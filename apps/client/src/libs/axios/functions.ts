import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { BaseAPI } from '@libs/openapi-generator/generated/base';

export type ErrorResponseData = {
  error: string;
  message: string;
  statusCode: number;
};

export interface CreateAxiosInstanceOptions {
  config?: AxiosRequestConfig;
}

export const createAxiosInstance = (options?: CreateAxiosInstanceOptions) => {
  return axios.create(options?.config);
};

export const axiosInstance = createAxiosInstance({
  config: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
  },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
type BaseAPIConstructor = new (
  ...args: ConstructorParameters<typeof BaseAPI>
) => any;
/* eslint-enable @typescript-eslint/no-explicit-any */

export const createApiFactory = <T extends BaseAPIConstructor>(
  APIInstance: T,
  axios: AxiosInstance | null = null
): InstanceType<T> => {
  return new APIInstance(
    undefined,
    process.env.NEXT_PUBLIC_API_BASE_URL,
    axios ?? axiosInstance
  );
};

export const getAxiosErrorData = (payload: unknown): ErrorResponseData => {
  const err = payload as AxiosError;
  return err.response?.data as ErrorResponseData;
};
