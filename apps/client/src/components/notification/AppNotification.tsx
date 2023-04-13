import { Alert, AlertProps, Snackbar } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { useAppDispatch } from '@client/stores';
import { removeNotification } from '@client/stores/slices/notificationSlice';

export interface AppNotificationProps
  extends Omit<AlertProps, 'sx' | 'ref' | 'defaultValue'> {
  content: string;
}

interface Props extends AppNotificationProps {
  notificationId: string;
  index: number;
}

export const AppNotification = ({
  content,
  notificationId,
  index,
  ...props
}: Props) => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(removeNotification(notificationId));
    },
    [dispatch, notificationId]
  );

  const positionTop = 24 + 52 * index;

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        top: positionTop + 'px !important',
      }}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {content}
      </Alert>
    </Snackbar>
  );
};
