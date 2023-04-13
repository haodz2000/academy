import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@client/utils/createEmotionCache';
import { CssBaseline } from '@mui/material';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ReactElement, ReactNode, useState } from 'react';
import { store } from '@client/stores/store';
import Script from 'next/script';
import { NextPage } from 'next';
import { AuthProvider } from '@client/providers/AuthProvider';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppThemeProvider } from '@client/providers/ThemeProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface MyAppProps extends AppProps<{ dehydratedState?: unknown }> {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { dehydratedState, ...pageProps },
  } = props;
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchIntervalInBackground: false,
            staleTime: 5000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={dehydratedState}>
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <AuthProvider>
              <Script
                src="https://accounts.google.com/gsi/client"
                strategy="lazyOnload"
                async
                defer
              />
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <AppThemeProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </AppThemeProvider>
            </AuthProvider>
          </CacheProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
