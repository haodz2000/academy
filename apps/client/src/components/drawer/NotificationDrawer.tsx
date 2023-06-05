import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {
  Badge,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { RoundedButton } from '../ui/buttons';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { GroupDateNotification } from '../notifications/GroupDateNotification';
import { useGetNotificationsQuery } from '@client/hooks/apis/notifications/useGetNotificationsQuery';
import { NotificationRead } from '@libs/constants/entities/Notification';
import { NotificationResponse } from '@libs/openapi-generator/generated';
import { Empty } from '../ui/Empty';
import { useReadAllNotificationMutation } from '@client/hooks/apis/notifications/useReadAllNotificationMutation';
import { useNotify } from '../notification/hook';

export interface INotificationCustome {
  date: string;
  notifications: NotificationResponse[];
}

export const NotificationDrawer = () => {
  const { notify, notifyError } = useNotify();
  const [state, setState] = React.useState(false);
  const readAllNotificationMutation = useReadAllNotificationMutation();
  const notificationsQuery = useGetNotificationsQuery({
    limit: 10,
    page: 1,
    read: NotificationRead.UnRead,
  });
  const toggleDrawer = () => {
    setState(!state);
  };
  const notifications = React.useMemo(() => {
    return notificationsQuery.data?.data ?? [];
  }, [notificationsQuery.data?.data]);
  const data = React.useMemo(() => {
    const map: Record<string, INotificationCustome> = {};
    for (const item of notifications) {
      const { created_at } = item;
      if (map[new Date(created_at).toLocaleDateString()]) {
        map[new Date(created_at).toLocaleDateString()].notifications.push(item);
      } else {
        map[new Date(created_at).toLocaleDateString()] = {
          date: new Date(created_at).toLocaleDateString(),
          notifications: [item],
        };
      }
    }
    return Object.values(map);
  }, [notifications]);
  const total = notificationsQuery.data?.pagination.total || 0;

  const onMarkAllNotification = async () => {
    try {
      const data = await readAllNotificationMutation.mutateAsync();
      notify({ content: data.data?.message });
    } catch (error) {
      notifyError({ error });
    }
  };

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer}>
          <Tooltip title="Thông báo">
            <Badge badgeContent={total} color="error">
              <NotificationsIcon htmlColor="#6c9ab9" />
            </Badge>
          </Tooltip>
        </IconButton>
        <Drawer anchor={'right'} open={state} onClose={toggleDrawer}>
          <Stack
            height={1}
            sx={{
              width: 300,
              bgcolor: '#151f32',
              '&::-webkit-scrollbar': {
                width: '0.7em',
              },
              overflowY: 'scroll',
              '&::-webkit-scrollbar-track': {
                background: '#5f6c80',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#203453',
                borderRadius: '50px',
              },
            }}
          >
            <Paper sx={{ bgcolor: '#151f32', width: 1 }}>
              <Stack>
                <Stack
                  paddingX={2}
                  paddingY={4}
                  gap={1}
                  flexDirection="row"
                  alignItems="center"
                >
                  <Typography variant="h6" fontWeight={600}>
                    Thông báo
                  </Typography>
                  <NotificationsActiveIcon htmlColor="#a9c3d4" />
                  {!!data.length && (
                    <RoundedButton
                      onClick={onMarkAllNotification}
                      variant="text"
                    >
                      Đánh dấu tất cả
                    </RoundedButton>
                  )}
                </Stack>
                <Divider sx={{ bgcolor: '#FFF' }} />
                <Stack gap={1}>
                  <Stack gap={1}>
                    {data.length ? (
                      data.map((i, index) => (
                        <GroupDateNotification data={i} key={index} />
                      ))
                    ) : (
                      <Empty content="Không có thông báo nào" />
                    )}
                  </Stack>
                  <Stack flexDirection={'row'} margin={'0 auto'}>
                    <RoundedButton sx={{ bgcolor: '#495161' }}>
                      Xem thêm
                    </RoundedButton>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Drawer>
      </React.Fragment>
    </div>
  );
};
