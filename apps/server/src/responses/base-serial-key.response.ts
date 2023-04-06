import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '@server/responses/base.response';

export class BaseSerialKeyResponse extends BaseResponse {
  @ApiProperty()
  id: number;
}
