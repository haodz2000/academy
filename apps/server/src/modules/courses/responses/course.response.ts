import { ApiProperty } from '@nestjs/swagger';
import { StoredFileResponse } from '@server/modules/stored-files/responses/stored-file.response';
import { UserResponse } from '@server/modules/users/responses/user.response';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class CourseResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: number;

  @ApiProperty({ type: StoredFileResponse })
  cover: StoredFileResponse | null;

  @ApiProperty()
  administrator_id: number;

  @ApiProperty({ type: UserResponse })
  administrator: UserResponse | null;
}
