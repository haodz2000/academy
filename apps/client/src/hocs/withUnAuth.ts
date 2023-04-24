import { GetServerSideProps } from 'next';
import { GetServerSidePropsContext } from 'next/types';
import { dehydrate, QueryClient } from '@tanstack/react-query';
export interface WithAuthHocOptions {
  redirect?: boolean;
}

type GetServiceSitePropsParam = (
  context: GetServerSidePropsContext,
  queryClient: QueryClient
) =>
  | Promise<{ props: Record<string, unknown> }>
  | { props: Record<string, unknown> };

export const withUnAuth = (
  getServiceSiteProps?: GetServiceSitePropsParam,
  options: WithAuthHocOptions = { redirect: true }
): GetServerSideProps => {
  return async (context) => {
    const queryClient = new QueryClient();

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
      },
    };
  };
};
