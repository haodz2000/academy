import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsCourseId } from '@server/validators/is-course-id.validator';
import { IsDefined, IsOptional } from 'class-validator';

export class RateQueryDto extends BaseDto {
  @ApiProperty()
  @IsDefined()
  @IsCourseId()
  @IsOptional()
  course_id: number;

  @ApiProperty({ default: 15 })
  @IsOptional()
  limit: number;

  @ApiProperty({ default: 1 })
  @IsOptional()
  page: number;
}
