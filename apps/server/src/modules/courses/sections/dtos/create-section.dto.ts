import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsCourseId } from '@server/validators/is-course-id.validator';
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class CreateSectionDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @IsCourseId()
  course_id: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
  description: string;
}
