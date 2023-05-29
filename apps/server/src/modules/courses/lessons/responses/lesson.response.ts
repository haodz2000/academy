import { ApiProperty } from '@nestjs/swagger';
import { StoredFileResponse } from '@server/modules/stored-files/responses/stored-file.response';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class LessonResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  video_id: string;

  @ApiProperty()
  section_id: number;

  @ApiProperty()
  order: number;

  @ApiProperty({ type: StoredFileResponse, nullable: true })
  video: StoredFileResponse | null;
}
