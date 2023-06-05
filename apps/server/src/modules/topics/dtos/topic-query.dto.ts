import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class TopicQueryDto extends BaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  c?: number;
}
