import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class FilterDiscussionDto extends BaseDto {
  @IsOptional()
  @ApiProperty()
  lesson_id: number;

  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  page?: number;
}
