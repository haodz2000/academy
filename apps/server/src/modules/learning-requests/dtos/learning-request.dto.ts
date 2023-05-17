import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class LearningRequestDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  course_id: number;
}
