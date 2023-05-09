import { ApiProperty } from '@nestjs/swagger';
import { BaseUuidKeyResponse } from '@server/responses/base-uuid-key.response';

export class AssignmentResponse extends BaseUuidKeyResponse {
  @ApiProperty()
  lesson_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
