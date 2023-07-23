import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsCourseId } from '@server/validators/is-course-id.validator';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class RateDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @IsCourseId()
  course_id: number;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Max(5)
  @Min(1)
  point: number;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
  comment: string;
}
