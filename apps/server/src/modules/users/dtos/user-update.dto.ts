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
  @ApiProperty({ required: false })
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsFacebook()
  facebook: string;

  @IsOptional()
  @ApiProperty({ required: false })
  github: string;

  @IsOptional()
  @ApiProperty({ required: false })
  twitter: string;

  @IsOptional()
  @ApiProperty({ required: false })
  job: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;
}
