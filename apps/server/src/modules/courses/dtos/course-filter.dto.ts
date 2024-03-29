import { TypeQueryCourse } from '@libs/constants/entities/Course';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class CourseFilterDto extends BaseDto {
  @ApiProperty({ default: 2 })
  @IsOptional()
  status: number;

  @ApiProperty({ default: 1 })
  @IsOptional()
  page: number;

  @ApiProperty({ default: 5 })
  @IsOptional()
  limit: number;

  @ApiProperty({
    enum: [TypeQueryCourse.Manage, TypeQueryCourse.Show],
    default: TypeQueryCourse.Show,
  })
  @IsOptional()
  type: TypeQueryCourse;
}
