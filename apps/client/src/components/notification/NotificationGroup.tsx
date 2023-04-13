import { useAppSelector } from '@client/stores';
import { AppNotification } from '@client/components/notification/AppNotification';

export const NotificationGroup = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );

  return (
    <>
      {!!notifications.length &&
        notifications.map((notification, index) => (
          <AppNotification
            content={notification.content}
            notificationId={notification.id}
            severity={notification.type}
            key={notification.id}
            index={index}
          />
        ))}
    </>
  );
};
