import { useAppSelector } from '@client/stores';
import { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { io } from 'socket.io-client';
import { SocketEvent } from '@libs/constants/socket';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';
import { NotificationRead } from '@libs/constants/entities/Notification';
import { useNotify } from '@client/components/notification/hook';

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const { notify } = useNotify();
  const user = useAppSelector((user) => user.user.user);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = io(
      `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ''}/${user?.id}`,
      {
        withCredentials: true,
      }
    );
    const socketGlobal = io(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ''}`, {
      withCredentials: true,
    });
    socket.on('connect', function () {
      console.log('Connected personal socket success...');
    });

    socket.on(SocketEvent.Notification, (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.notifications,
          {
            limit: 10,
            page: 1,
            read: NotificationRead.UnRead,
          },
        ],
      });
    });

    socket.on(SocketEvent.MarkAsRead, (message) => {
      notify({ content: message });
      queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.notifications,
          {
            limit: 10,
            page: 1,
            read: NotificationRead.UnRead,
          },
        ],
      });
    });

    socketGlobal.on('connect', function () {
      console.log('Connected global socket success');
    });

    return () => {
      socket.disconnect();
      socketGlobal.disconnect();
    };
  }, [notify, queryClient, user]);
  return <>{children}</>;
};
