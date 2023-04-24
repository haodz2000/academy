import { ApiProperty } from '@nestjs/swagger';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class SectionRespone extends BaseSerialKeyResponse {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  course_id: number;
}
