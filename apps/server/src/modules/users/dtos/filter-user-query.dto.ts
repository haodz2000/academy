import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';

export class FilterUserQueryDto extends BaseDto {
  @ApiProperty({ required: false })
  q: string;

  @ApiProperty({ required: false, default: 0 })
  page: number;

  @ApiProperty({ required: false, default: 15 })
  limit: number;
}
