/* tslint:disable */
/* eslint-disable */
/**
 * English
 * English API documents
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from './configuration';
import globalAxios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from './common';
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from './base';

/**
 *
 * @export
 * @interface ApiError
 */
export interface ApiError {
  /**
   *
   * @type {object}
   * @memberof ApiError
   */
  error?: object | null;
  /**
   *
   * @type {string}
   * @memberof ApiError
   */
  traceId: string;
  /**
   *
   * @type {string}
   * @memberof ApiError
   */
  code: string;
  /**
   *
   * @type {string}
   * @memberof ApiError
   */
  message: string;
  /**
   *
   * @type {Array<object>}
   * @memberof ApiError
   */
  validationErrors: Array<object>;
  /**
   *
   * @type {string}
   * @memberof ApiError
   */
  timestamp: string;
}
/**
 *
 * @export
 * @interface AppApiErrorResponse
 */
export interface AppApiErrorResponse {
  /**
   *
   * @type {ApiError}
   * @memberof AppApiErrorResponse
   */
  error: ApiError;
  /**
   *
   * @type {string}
   * @memberof AppApiErrorResponse
   */
  message: string;
}
/**
 *
 * @export
 * @interface AppApiSuccessResponse
 */
export interface AppApiSuccessResponse {
  /**
   *
   * @type {string}
   * @memberof AppApiSuccessResponse
   */
  message: string;
}
/**
 *
 * @export
 * @interface AuthMe200Response
 */
export interface AuthMe200Response {
  /**
   *
   * @type {string}
   * @memberof AuthMe200Response
   */
  message: string;
  /**
   *
   * @type {UserResponse}
   * @memberof AuthMe200Response
   */
  data: UserResponse;
}
/**
 *
 * @export
 * @interface AuthMe200ResponseAllOf
 */
export interface AuthMe200ResponseAllOf {
  /**
   *
   * @type {UserResponse}
   * @memberof AuthMe200ResponseAllOf
   */
  data?: UserResponse;
}
/**
 *
 * @export
 * @interface GoogleLogin200Response
 */
export interface GoogleLogin200Response {
  /**
   *
   * @type {string}
   * @memberof GoogleLogin200Response
   */
  message: string;
  /**
   *
   * @type {GoogleLoginResponse}
   * @memberof GoogleLogin200Response
   */
  data: GoogleLoginResponse;
}
/**
 *
 * @export
 * @interface GoogleLogin200ResponseAllOf
 */
export interface GoogleLogin200ResponseAllOf {
  /**
   *
   * @type {GoogleLoginResponse}
   * @memberof GoogleLogin200ResponseAllOf
   */
  data?: GoogleLoginResponse;
}
/**
 *
 * @export
 * @interface GoogleLoginDto
 */
export interface GoogleLoginDto {
  /**
   *
   * @type {string}
   * @memberof GoogleLoginDto
   */
  credential: string;
}
/**
 *
 * @export
 * @interface GoogleLoginResponse
 */
export interface GoogleLoginResponse {
  /**
   *
   * @type {string}
   * @memberof GoogleLoginResponse
   */
  token: string;
}
/**
 *
 * @export
 * @interface RoleResponse
 */
export interface RoleResponse {
  /**
   *
   * @type {string}
   * @memberof RoleResponse
   */
  created_at: string;
  /**
   *
   * @type {string}
   * @memberof RoleResponse
   */
  updated_at: string;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof RoleResponse
   */
  creator: UserBasicResponseCreator | null;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof RoleResponse
   */
  updater: UserBasicResponseCreator | null;
  /**
   *
   * @type {string}
   * @memberof RoleResponse
   */
  __typename?: RoleResponseTypenameEnum;
  /**
   *
   * @type {number}
   * @memberof RoleResponse
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof RoleResponse
   */
  name: string;
  /**
   *
   * @type {number}
   * @memberof RoleResponse
   */
  type: RoleResponseTypeEnum;
}

export const RoleResponseTypenameEnum = {
  All: 'all',
  Users: 'users',
  Roles: 'roles',
  StoredFiles: 'stored_files',
} as const;

export type RoleResponseTypenameEnum =
  (typeof RoleResponseTypenameEnum)[keyof typeof RoleResponseTypenameEnum];
export const RoleResponseTypeEnum = {
  NUMBER_1: 1,
  NUMBER_2: 2,
} as const;

export type RoleResponseTypeEnum =
  (typeof RoleResponseTypeEnum)[keyof typeof RoleResponseTypeEnum];

/**
 *
 * @export
 * @interface StoredFileResponse
 */
export interface StoredFileResponse {
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  created_at: string;
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  updated_at: string;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof StoredFileResponse
   */
  creator: UserBasicResponseCreator | null;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof StoredFileResponse
   */
  updater: UserBasicResponseCreator | null;
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  __typename?: StoredFileResponseTypenameEnum;
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  hash: string;
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  key: string;
  /**
   *
   * @type {string}
   * @memberof StoredFileResponse
   */
  path: string;
}

export const StoredFileResponseTypenameEnum = {
  All: 'all',
  Users: 'users',
  Roles: 'roles',
  StoredFiles: 'stored_files',
} as const;

export type StoredFileResponseTypenameEnum =
  (typeof StoredFileResponseTypenameEnum)[keyof typeof StoredFileResponseTypenameEnum];

/**
 *
 * @export
 * @interface UserBasicResponse
 */
export interface UserBasicResponse {
  /**
   *
   * @type {number}
   * @memberof UserBasicResponse
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponse
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponse
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponse
   */
  google_id: string | null;
  /**
   *
   * @type {number}
   * @memberof UserBasicResponse
   */
  role_id: number;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponse
   */
  avatar_id: string | null;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponse
   */
  created_at: string;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponse
   */
  updated_at: string;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof UserBasicResponse
   */
  creator: UserBasicResponseCreator | null;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof UserBasicResponse
   */
  updater: UserBasicResponseCreator | null;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponse
   */
  __typename?: UserBasicResponseTypenameEnum;
}

export const UserBasicResponseTypenameEnum = {
  All: 'all',
  Users: 'users',
  Roles: 'roles',
  StoredFiles: 'stored_files',
} as const;

export type UserBasicResponseTypenameEnum =
  (typeof UserBasicResponseTypenameEnum)[keyof typeof UserBasicResponseTypenameEnum];

/**
 *
 * @export
 * @interface UserBasicResponseCreator
 */
export interface UserBasicResponseCreator {
  /**
   *
   * @type {number}
   * @memberof UserBasicResponseCreator
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponseCreator
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponseCreator
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponseCreator
   */
  google_id: string | null;
  /**
   *
   * @type {number}
   * @memberof UserBasicResponseCreator
   */
  role_id: number;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponseCreator
   */
  avatar_id: string | null;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponseCreator
   */
  created_at: string;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponseCreator
   */
  updated_at: string;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof UserBasicResponseCreator
   */
  creator: UserBasicResponseCreator | null;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof UserBasicResponseCreator
   */
  updater: UserBasicResponseCreator | null;
  /**
   *
   * @type {string}
   * @memberof UserBasicResponseCreator
   */
  __typename?: UserBasicResponseCreatorTypenameEnum;
}

export const UserBasicResponseCreatorTypenameEnum = {
  All: 'all',
  Users: 'users',
  Roles: 'roles',
  StoredFiles: 'stored_files',
} as const;

export type UserBasicResponseCreatorTypenameEnum =
  (typeof UserBasicResponseCreatorTypenameEnum)[keyof typeof UserBasicResponseCreatorTypenameEnum];

/**
 *
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
  /**
   *
   * @type {number}
   * @memberof UserResponse
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  google_id: string | null;
  /**
   *
   * @type {number}
   * @memberof UserResponse
   */
  role_id: number;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  avatar_id: string | null;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  created_at: string;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  updated_at: string;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof UserResponse
   */
  creator: UserBasicResponseCreator | null;
  /**
   *
   * @type {UserBasicResponseCreator}
   * @memberof UserResponse
   */
  updater: UserBasicResponseCreator | null;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  __typename?: UserResponseTypenameEnum;
  /**
   *
   * @type {StoredFileResponse}
   * @memberof UserResponse
   */
  avatar: StoredFileResponse;
  /**
   *
   * @type {RoleResponse}
   * @memberof UserResponse
   */
  role: RoleResponse;
}

export const UserResponseTypenameEnum = {
  All: 'all',
  Users: 'users',
  Roles: 'roles',
  StoredFiles: 'stored_files',
} as const;

export type UserResponseTypenameEnum =
  (typeof UserResponseTypenameEnum)[keyof typeof UserResponseTypenameEnum];

/**
 * AppApi - axios parameter creator
 * @export
 */
export const AppApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getData: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/api`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * AppApi - functional programming interface
 * @export
 */
export const AppApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = AppApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getData(
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getData(
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * AppApi - factory interface
 * @export
 */
export const AppApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = AppApiFp(configuration);
  return {
    /**
     *
     * @summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getData(options?: any): AxiosPromise<void> {
      return localVarFp
        .getData(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * AppApi - object-oriented interface
 * @export
 * @class AppApi
 * @extends {BaseAPI}
 */
export class AppApi extends BaseAPI {
  /**
   *
   * @summary
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AppApi
   */
  public getData(options?: AxiosRequestConfig) {
    return AppApiFp(this.configuration)
      .getData(options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    me: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/api/auth/me`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async me(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<AuthMe200Response>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.me(options);
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = AuthApiFp(configuration);
  return {
    /**
     *
     * @summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    me(options?: any): AxiosPromise<AuthMe200Response> {
      return localVarFp.me(options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
  /**
   *
   * @summary
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  public me(options?: AxiosRequestConfig) {
    return AuthApiFp(this.configuration)
      .me(options)
      .then((request) => request(this.axios, this.basePath));
  }
}

/**
 * AuthGoogleApi - axios parameter creator
 * @export
 */
export const AuthGoogleApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary
     * @param {GoogleLoginDto} googleLoginDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login: async (
      googleLoginDto: GoogleLoginDto,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'googleLoginDto' is not null or undefined
      assertParamExists('login', 'googleLoginDto', googleLoginDto);
      const localVarPath = `/api/auth/google`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        googleLoginDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * AuthGoogleApi - functional programming interface
 * @export
 */
export const AuthGoogleApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    AuthGoogleApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary
     * @param {GoogleLoginDto} googleLoginDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async login(
      googleLoginDto: GoogleLoginDto,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<GoogleLogin200Response>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.login(
        googleLoginDto,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * AuthGoogleApi - factory interface
 * @export
 */
export const AuthGoogleApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = AuthGoogleApiFp(configuration);
  return {
    /**
     *
     * @summary
     * @param {GoogleLoginDto} googleLoginDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login(
      googleLoginDto: GoogleLoginDto,
      options?: any
    ): AxiosPromise<GoogleLogin200Response> {
      return localVarFp
        .login(googleLoginDto, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for login operation in AuthGoogleApi.
 * @export
 * @interface AuthGoogleApiLoginRequest
 */
export interface AuthGoogleApiLoginRequest {
  /**
   *
   * @type {GoogleLoginDto}
   * @memberof AuthGoogleApiLogin
   */
  readonly googleLoginDto: GoogleLoginDto;
}

/**
 * AuthGoogleApi - object-oriented interface
 * @export
 * @class AuthGoogleApi
 * @extends {BaseAPI}
 */
export class AuthGoogleApi extends BaseAPI {
  /**
   *
   * @summary
   * @param {AuthGoogleApiLoginRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthGoogleApi
   */
  public login(
    requestParameters: AuthGoogleApiLoginRequest,
    options?: AxiosRequestConfig
  ) {
    return AuthGoogleApiFp(this.configuration)
      .login(requestParameters.googleLoginDto, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
