import { TypeLesson } from '@libs/constants/entities/Lesson';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class UpdateLessonDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsOptional()
  description: string;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @MaxLength(255)
  link: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    nullable: true,
    required: false,
  })
  video: Express.Multer.File;

  @IsOptional()
  @IsDefined()
  @ApiProperty({ enum: TypeLesson })
  type: TypeLesson;

  @IsOptional()
  @ApiProperty()
  time: number;
}
