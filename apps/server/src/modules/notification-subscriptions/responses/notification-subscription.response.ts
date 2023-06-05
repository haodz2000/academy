import { ApiProperty } from '@nestjs/swagger';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';
import { NotificationSubscriptionStatus } from '@libs/constants/entities/NotificationSubscription';
import { UserBasicResponse } from '@server/modules/users/responses/user-basic.response';

export class NotificationSubscriptionResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  token: string;

  @ApiProperty()
  last_active: string;

  @ApiProperty({ type: UserBasicResponse })
  user: UserBasicResponse;

  @ApiProperty({ enum: NotificationSubscriptionStatus })
  status: NotificationSubscriptionStatus;
}
