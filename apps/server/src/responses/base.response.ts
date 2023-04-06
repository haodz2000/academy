import { ApiProperty } from '@nestjs/swagger';
import { IdSubject } from '@libs/constants/abilities';
import { UserBasicResponse } from '@server/modules/users/responses/user-basic.response';

export class BaseResponse {
  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty({ type: UserBasicResponse, nullable: true })
  creator: UserBasicResponse | null;

  @ApiProperty({ type: UserBasicResponse, nullable: true })
  updater: UserBasicResponse | null;

  @ApiProperty({ enum: IdSubject, required: false, nullable: true })
  __typename?: IdSubject;
}
