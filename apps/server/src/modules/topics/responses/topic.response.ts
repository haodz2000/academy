import { ApiProperty } from '@nestjs/swagger';
import { StoredFileResponse } from '@server/modules/stored-files/responses/stored-file.response';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class TopicResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  cover_id: string;

  @ApiProperty({ type: StoredFileResponse, nullable: true })
  cover: StoredFileResponse | null;
}
