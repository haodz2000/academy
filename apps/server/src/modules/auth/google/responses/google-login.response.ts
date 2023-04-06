import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginResponse {
  @ApiProperty()
  token: string;
}
