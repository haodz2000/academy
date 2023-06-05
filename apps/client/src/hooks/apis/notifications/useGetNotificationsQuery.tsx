import { createApiFactory } from '@client/libs/axios/functions';
import {
  NotificationsApi,
  NotificationsApiListRequest,
} from '@libs/openapi-generator/generated';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryKeys';

export const getNotifications = async (
  requestParameters: NotificationsApiListRequest
) => {
  return (await createApiFactory(NotificationsApi).list(requestParameters))
    .data;
};

export const useGetNotificationsQuery = (
  requestParameters: NotificationsApiListRequest
) => {
  return useQuery({
    queryKey: [QueryKeys.notifications, requestParameters],
    queryFn: () => getNotifications(requestParameters),
  });
};
