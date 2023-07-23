import { ApiProperty } from '@nestjs/swagger';

export class AverageResponse {
  @ApiProperty()
  rate_point: number;
}
