import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@server/validators/base.dto';
import { IsFacebook } from '@server/validators/is-facebook.validator';
import { IsPhoneNumber } from '@server/validators/is-phone.validator';
import { IsDefined, IsOptional } from 'class-validator';

export class UserUpdateDto extends BaseDto {
  @IsOptional()
  @ApiProperty()
  @IsDefined()
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @ApiProperty()
  @IsFacebook()
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
