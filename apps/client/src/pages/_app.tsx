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
import { useState } from 'react';
import { store } from '@client/stores/store';
import Script from 'next/script';
import { AuthProvider } from '@client/providers/AuthProvider';
import { AppLayout } from '@client/components/layout/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppThemeProvider } from '@client/providers/ThemeProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{ dehydratedState?: unknown }> {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
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
      <Hydrate state={pageProps.dehydratedState}>
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
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </AppThemeProvider>
            </AuthProvider>
          </CacheProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
