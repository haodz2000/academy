import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional, MaxLength } from 'class-validator';

export class UpdateSectionDto extends BaseDto {
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
