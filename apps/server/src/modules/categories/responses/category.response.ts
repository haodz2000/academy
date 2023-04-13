import { ApiProperty } from '@nestjs/swagger';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class CategoryResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}
