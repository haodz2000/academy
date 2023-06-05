import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import {
  isSupported,
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { useNotificationSubscriptionMutation } from '@client/hooks/apis/notification-subscriptions/useNotificationSubscriptionMutation';
import { useAppSelector } from '@client/stores';

const firebaseConfig = {
  apiKey: 'AIzaSyBzEG_bG1PcTjj_LPhcyjOxG3MF_UcLgKc',
  authDomain: 'zero3z.firebaseapp.com',
  projectId: 'zero3z',
  storageBucket: 'zero3z.appspot.com',
  messagingSenderId: '69201417644',
  appId: '1:69201417644:web:5a3f6db177d4ae2df01609',
  measurementId: 'G-WY1LCFMR3Y',
};

export const FcmProvider: FC<PropsWithChildren> = (props) => {
  const user = useAppSelector((state) => state.user.user);
  const sent = useRef<boolean>(false);
  const notificationSubscriptionMutation =
    useNotificationSubscriptionMutation();
  useEffect(() => {
    if (!user) {
      return;
    }
    const createSubscription = async () => {
      if (!(await isSupported())) return;
      initializeApp(firebaseConfig);
      try {
        const messaging = getMessaging();
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FCM_KEYPAIR,
        });
        if (token) {
          await notificationSubscriptionMutation.mutateAsync({
            notificationSubscriptionCreateDto: {
              token: token,
            },
          });
        }
        onMessage(messaging, (payload) => {
          console.log(1);
          new Notification(payload.notification?.title ?? '', {
            body: payload.notification?.body,
            image: payload.notification?.image,
          });
        });
      } catch (error) {
        //
        console.log(error);
      }
    };
    if (!sent.current) {
      createSubscription();
      sent.current = true;
    }
  }, [user, notificationSubscriptionMutation]);
  return <>{props.children}</>;
};
