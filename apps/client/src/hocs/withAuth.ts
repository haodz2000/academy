import { GetServerSideProps } from 'next';
import { GetServerSidePropsContext } from 'next/types';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { createAxiosInstance } from '@client/libs/axios/functions';
import { JwtCookieToken } from '@libs/constants/auth';
import { UserResponse } from '@libs/openapi-generator/generated';
import { QueryKeys } from '@client/hooks/apis/queryKeys';
import { fetchMe } from '@client/hooks/apis/users/useMeQuery';

export interface WithAuthHocOptions {
  redirect?: boolean;
}

type GetServiceSitePropsParam = (
  context: GetServerSidePropsContext,
  queryClient: QueryClient
) =>
  | Promise<{ props: Record<string, unknown> }>
  | { props: Record<string, unknown> };

export const withAuth = (
  getServiceSiteProps?: GetServiceSitePropsParam,
  options: WithAuthHocOptions = { redirect: true }
): GetServerSideProps => {
  return async (context) => {
    let user: UserResponse | undefined = undefined;
    const queryClient = new QueryClient();
    const axiosInstance = createAxiosInstance({
      config: {
        headers: {
          Cookie: `${JwtCookieToken}=${context.req.cookies[JwtCookieToken]};`,
        },
      },
    });
    try {
      user = await queryClient.fetchQuery([QueryKeys.me], () =>
        fetchMe(axiosInstance)
      );
    } catch (e) {
      return {
        props: { error: 'Unauthenticated.' },
        redirect: {
          destination: '/',
        },
      };
    }
    try {
      if (getServiceSiteProps) {
        const { props: contextProps, ...rest } = await getServiceSiteProps(
          context,
          queryClient
        );
        return {
          props: {
            ...contextProps,
            dehydratedState: dehydrate(queryClient),
            user,
          },
          ...rest,
        };
      }
    } catch (e) {
      if (!options.redirect) {
        return {
          props: { error: 'Internal Server Error.' },
          redirect: {
            destination: '/500',
          },
        };
      }
    }
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        user,
      },
    };
  };
};
