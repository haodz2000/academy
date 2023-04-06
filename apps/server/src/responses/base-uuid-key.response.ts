import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '@server/responses/base.response';

export class BaseUuidKeyResponse extends BaseResponse {
  @ApiProperty()
  id: string;
}
