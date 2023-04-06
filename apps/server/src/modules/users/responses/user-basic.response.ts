import { IdSubject } from '@libs/constants/abilities';
import { ApiProperty } from '@nestjs/swagger';

export class UserBasicResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true })
  google_id: string | null;

  @ApiProperty()
  role_id: number;

  @ApiProperty({ nullable: true })
  avatar_id: string | null;

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
