import { IdSubject } from '@libs/constants/abilities';
import { NotificationSubscription } from '@libs/entities/entities/NotificationSubscription';
import { UserTransformer } from '@server/modules/users/transformers/user.transformer';
import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { NotificationSubscriptionResponse } from '../responses/notification-subscription.response';

export class NotificationSubscriptionTransformer extends BaseResponseTransformer {
  static toNotificationSubscriptionResponse(
    notificationSubscription: NotificationSubscription
  ): NotificationSubscriptionResponse {
    return {
      ...BaseResponseTransformer.transformEntityTimestamps(
        notificationSubscription
      ),
      last_active: BaseResponseTransformer.transformDateTimeField(
        notificationSubscription.last_active
      ),
      user: UserTransformer.toUserBasicResponse(notificationSubscription.user),
      creator: null,
      updater: null,
      __typename: IdSubject.NotificationSubscriptions,
    };
  }
}
