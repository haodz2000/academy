import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, MaxLength } from 'class-validator';

export class CreateAssignmentDto extends BaseDto {
  @ApiProperty()
  @IsDefined()
  lesson_id: number;

  @ApiProperty()
  @IsDefined()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsDefined()
  description: string;
}
