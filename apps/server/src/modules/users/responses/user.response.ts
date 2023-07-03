import { ApiProperty } from '@nestjs/swagger';
import { RoleResponse } from '@server/modules/roles/responses/role.response';
import { StoredFileResponse } from '@server/modules/stored-files/responses/stored-file.response';
import { UserBasicResponse } from './user-basic.response';
import { WalletResponse } from '@server/modules/wallets/responses/wallet.response';

export class UserResponse extends UserBasicResponse {
  @ApiProperty({ type: StoredFileResponse })
  avatar: StoredFileResponse;

  @ApiProperty({ type: RoleResponse })
  role: RoleResponse;

  @ApiProperty({ type: WalletResponse })
  wallet: WalletResponse;
}
