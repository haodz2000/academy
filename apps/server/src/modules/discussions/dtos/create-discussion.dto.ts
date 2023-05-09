import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional } from 'class-validator';

export class CreateDiscussionDto extends BaseDto {
  @ApiProperty()
  @IsOptional()
  @IsDefined()
  lesson_id: number;

  @ApiProperty()
  @IsOptional()
  @IsDefined()
  description: string;
}
