import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsDefined, IsOptional } from 'class-validator';

export class UserUpdateDto extends BaseDto {
  @IsOptional()
  @ApiProperty()
  @IsDefined()
  name: string;

  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  facebook: string;

  @IsOptional()
  @ApiProperty()
  github: string;

  @IsOptional()
  @ApiProperty()
  twitter: string;

  @IsOptional()
  @ApiProperty()
  job: string;

  @IsOptional()
  @ApiProperty()
  description: string;
}
