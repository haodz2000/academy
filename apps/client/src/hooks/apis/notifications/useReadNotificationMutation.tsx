import { createApiFactory } from '@client/libs/axios/functions';
import {
  NotificationsApi,
  NotificationsApiReadNotificationRequest,
} from '@libs/openapi-generator/generated';
import { useMutation } from '@tanstack/react-query';

export const readNotification = async (
  requestParameter: NotificationsApiReadNotificationRequest
) => {
  return (
    await createApiFactory(NotificationsApi).readNotification(requestParameter)
  ).data;
};

export const useReadNotificationMutation = () => {
  return useMutation({
    mutationFn: readNotification,
  });
};
