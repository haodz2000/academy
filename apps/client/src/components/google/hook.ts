import { useEffect } from 'react';
import { useAppSelector } from '@client/stores';

export const useRenderGoogleSignIn = () => {
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    if (window['google' as any] && !user) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        login_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
      });
      window.google.accounts.id.prompt();
      const googleLoginDiv: HTMLElement | null =
        document.getElementById('g_id_onload');
      window.google.accounts.id.renderButton(googleLoginDiv, {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        login_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
      });
    }
  }, [user]);
};
