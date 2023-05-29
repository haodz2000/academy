import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class CreateLessonDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsDefined()
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
}
