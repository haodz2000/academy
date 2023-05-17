import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '@server/modules/users/responses/user.response';
import { BaseUuidKeyResponse } from '@server/responses/base-uuid-key.response';

export class DiscussionResponse extends BaseUuidKeyResponse {
  @ApiProperty()
  description: string;

  @ApiProperty()
  lesson_id: number;

  @ApiProperty({ type: UserResponse, nullable: true })
  creator: UserResponse | null;
}
