import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import Link from '../ui/Link';
import { NotificationResponse } from '@libs/openapi-generator/generated';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useReadNotificationMutation } from '@client/hooks/apis/notifications/useReadNotificationMutation';
import { useNotify } from '../notification/hook';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@client/hooks/apis/queryKeys';
import { NotificationRead } from '@libs/constants/entities/Notification';

interface Props {
  notification: NotificationResponse;
}
export const NotificationItem = ({ notification }: Props) => {
  const { notifyError } = useNotify();
  const queryClient = useQueryClient();
  const readNotificationMutation = useReadNotificationMutation();
  const onClick = async () => {
    try {
      await readNotificationMutation.mutateAsync({ id: notification.id });
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
    } catch (error) {
      notifyError({ error });
    }
  };
  return (
    <Stack
      bgcolor={'#21212b'}
      color={'#fff'}
      padding={2}
      gap={1}
      position={'relative'}
    >
      <Stack position={'absolute'} top={0} right={0} zIndex={999}>
        <Tooltip title="Đánh dấu">
          <IconButton onClick={onClick}>
            <CheckCircleOutlineIcon color="success" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack
        component={Link}
        href={notification.fcm_message.webpush.fcmOptions.link}
        underline="none"
        gap={1}
      >
        <Typography fontWeight={600}>
          {notification.fcm_message.notification.title}
        </Typography>
        <Typography variant="caption" color={'#dddddd'}>
          {notification.fcm_message.notification.body}
        </Typography>
      </Stack>
    </Stack>
  );
};
