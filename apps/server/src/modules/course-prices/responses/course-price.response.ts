import { ApiProperty } from '@nestjs/swagger';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class CoursePriceResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  course_id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;
}
