import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class TopicQueryDto extends BaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  c?: number;
}
