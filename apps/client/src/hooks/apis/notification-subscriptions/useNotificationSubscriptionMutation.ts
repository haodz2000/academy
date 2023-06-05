import { createApiFactory } from '@client/libs/axios/functions';
import {
  NotificationSubscriptionsApiCreateRequest,
  NotificationSubscriptionsApi,
} from '@libs/openapi-generator/generated/api';
import { useMutation } from '@tanstack/react-query';

export const notificationSubscriptionMutation = async (
  requestParameters: NotificationSubscriptionsApiCreateRequest
) => {
  return (
    await createApiFactory(NotificationSubscriptionsApi).create(
      requestParameters
    )
  ).data;
};

export const useNotificationSubscriptionMutation = () => {
  return useMutation({
    mutationFn: notificationSubscriptionMutation,
  });
};
