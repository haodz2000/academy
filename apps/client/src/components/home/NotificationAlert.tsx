import { useLocalStorage } from 'react-use';
import { Alert, Stack, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import { useNotify } from '../notification/hook';
import { RoundedButton } from '../ui/buttons/RoundedButton';

export const NotificationAlert = () => {
  const { notifyError } = useNotify();
  const [notificationRequestPermissions, setNotificationRequestPermissions] =
    useLocalStorage('notifications_request_permissions', true);

  const [state, setState] = useState<NotificationPermission>(
    Notification.permission
  );

  useEffect(() => {
    const listerPermissions = async () => {
      try {
        if ('permissions' in navigator) {
          const notificationPerm = await navigator.permissions.query({
            name: 'notifications',
          });
          notificationPerm.onchange = function () {
            setState(notificationPerm.state as NotificationPermission);
          };
        }
      } catch (e) {
        console.log('Browser is not support Permissions query.');
      }
    };
    listerPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      await Notification.requestPermission();
    } catch (e) {
      notifyError({ error: e });
    }
  };

  return (
    <>
      {notificationRequestPermissions && state !== 'granted' && (
        <Alert severity="info" icon={false}>
          <Typography variant="body2">
            Vui lòng bật thông báo ở nút <InfoOutlinedIcon sx={{ mt: 0.5 }} />{' '}
            bên cạnh địa chỉ website để không bỏ lỡ các thông báo quan trọng.
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <RoundedButton
              size="small"
              color="info"
              sx={{ mt: '8px !important' }}
              onClick={() => setNotificationRequestPermissions(false)}
            >
              Tôi đã hiểu, không nhắc lại nữa
            </RoundedButton>
            {state === 'default' && (
              <RoundedButton
                size="small"
                sx={{ mt: '8px !important' }}
                onClick={requestPermissions}
              >
                Bật thông báo
              </RoundedButton>
            )}
          </Stack>
        </Alert>
      )}
    </>
  );
};
