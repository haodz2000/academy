import { ModeCourse } from '@libs/constants/entities/Course';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class CourseCreateDto extends BaseDto {
  @IsOptional()
  @ApiProperty()
  @IsDefined()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  cover: Express.Multer.File;

  @IsOptional()
  @IsDefined()
  @ApiProperty({ enum: ModeCourse })
  mode: ModeCourse;

  @IsOptional()
  @ApiProperty({ required: false })
  price: number;

  @ApiProperty({
    name: 'topics_ids[]',
    type: 'number',
    required: false,
    isArray: true,
  })
  @IsOptional()
  topics_ids?: number[];

  @IsOptional()
  @ApiProperty({ required: false })
  discount: number;
}
