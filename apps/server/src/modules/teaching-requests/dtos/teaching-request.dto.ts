import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsCourseId } from '@server/validators/is-course-id.validator';
import { IsOptional } from 'class-validator';

export class TeachingRequestDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsCourseId()
  course_id: number;
}
