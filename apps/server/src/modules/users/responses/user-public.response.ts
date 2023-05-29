import { IdSubject } from '@libs/constants/abilities';
import { ApiProperty } from '@nestjs/swagger';
import { StoredFileResponse } from '@server/modules/stored-files/responses/stored-file.response';

export class UserPublicResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true, type: StoredFileResponse })
  avatar: StoredFileResponse | null;

  @ApiProperty({ enum: IdSubject, required: false, nullable: true })
  __typename?: IdSubject;
}
