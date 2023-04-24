import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class CourseUpdateDto extends BaseDto {
  @IsOptional()
  @ApiProperty()
  @IsDefined()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  cover: Express.Multer.File;

  @IsOptional()
  @ApiProperty({ isArray: true, name: 'topicIds[]', type: 'number' })
  topicIds: number[];
}
