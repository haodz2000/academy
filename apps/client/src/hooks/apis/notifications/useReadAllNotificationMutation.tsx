import { createApiFactory } from '@client/libs/axios/functions';
import { NotificationsApi } from '@libs/openapi-generator/generated';
import { useMutation } from '@tanstack/react-query';

export const readAllNotification = async () => {
  return (await createApiFactory(NotificationsApi).readAllNotification()).data;
};

export const useReadAllNotificationMutation = () => {
  return useMutation({
    mutationFn: readAllNotification,
  });
};
