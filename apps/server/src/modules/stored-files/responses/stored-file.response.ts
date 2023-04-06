import { ApiProperty } from '@nestjs/swagger';
import { BaseUuidKeyResponse } from '@server/responses/base-uuid-key.response';

export class StoredFileResponse extends BaseUuidKeyResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  path: string;
}
