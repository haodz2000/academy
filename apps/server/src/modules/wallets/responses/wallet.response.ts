import { ApiProperty } from '@nestjs/swagger';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class WalletResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  balance: number;
}
