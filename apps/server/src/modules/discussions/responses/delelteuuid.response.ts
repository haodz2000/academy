import { ApiProperty } from '@nestjs/swagger';

export class DeleteUuidResponse {
  @ApiProperty()
  id: string;
}
