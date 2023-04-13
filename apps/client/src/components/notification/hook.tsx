import { useCallback } from 'react';
import { v4 } from 'uuid';
import { useAppDispatch } from '@client/stores';
import {
  addNotification,
  AppNotification,
} from '@client/stores/slices/notificationSlice';
import { isAxiosError } from 'axios';
import { AppApiErrorResponse } from '@libs/utils/responses';

export interface NotifyHookResults {
  notify: (props?: Partial<AppNotification>) => void;
  notifyError: (props?: Partial<AppNotification>) => void;
}

export const useNotify = () => {
  const dispatch = useAppDispatch();

  const notify = useCallback<NotifyHookResults['notify']>(
    (props) => {
      dispatch(
        addNotification({
          id: props?.id ?? v4(),
          type: props?.type ?? 'success',
          content: props?.content ?? 'Thành công!',
        })
      );
    },
    [dispatch]
  );

  const notifyError = useCallback<NotifyHookResults['notifyError']>(
    (props) => {
      let content = props?.content ?? 'Đã có lỗi xảy ra!';
      if (props?.error && isAxiosError(props.error)) {
        const response: AppApiErrorResponse | undefined =
          props.error.response?.data;
        if (response && response.error) {
          content = response.error.message;
        }
      }
      dispatch(
        addNotification({
          id: props?.id ?? v4(),
          type: props?.type ?? 'error',
          content,
        })
      );
    },
    [dispatch]
  );

  return {
    notify,
    notifyError,
  };
};
