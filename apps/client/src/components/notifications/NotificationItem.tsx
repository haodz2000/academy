import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import Link from '../ui/Link';
import { NotificationResponse } from '@libs/openapi-generator/generated';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Props {
  notification: NotificationResponse;
}
export const NotificationItem = ({ notification }: Props) => {
  return (
    <Stack
      bgcolor={'#21212b'}
      component={Link}
      href={notification.fcm_message.webpush.fcmOptions.link ?? '#'}
      underline="none"
      color={'#fff'}
      padding={2}
      gap={1}
    >
      <Stack
        flexDirection="row"
        gap={1}
        alignItems="center"
        justifyContent={'space-bettwen'}
      >
        <Typography fontWeight={600}>
          {notification.fcm_message.notification.title}
        </Typography>
        <Tooltip title="Đánh dấu">
          <IconButton>
            <CheckCircleOutlineIcon color="success" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Typography variant="caption" color={'#dddddd'}>
        {notification.fcm_message.notification.body}
      </Typography>
    </Stack>
  );
};
