import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@libs/constants/entities/Role';
import { BaseSerialKeyResponse } from '@server/responses/base-serial-key.response';

export class RoleResponse extends BaseSerialKeyResponse {
  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: [RoleType.Admin, RoleType.User],
  })
  type: RoleType;
}
