import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional } from 'class-validator';

export class FilterAssignmentDto extends BaseDto {
  @IsOptional()
  @ApiProperty()
  @IsDefined()
  lesson_id: number;

  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  page: number;
}
