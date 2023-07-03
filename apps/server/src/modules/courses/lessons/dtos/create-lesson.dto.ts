import { TypeLesson } from '@libs/constants/entities/Lesson';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsSectionId } from '@server/validators/is-section-id.validator';
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class CreateLessonDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @IsSectionId()
  section_id: number;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
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
  @IsDefined()
  @ApiProperty()
  time: number;
}
