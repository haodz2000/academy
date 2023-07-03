import { GoogleCredentialProperty } from '@libs/swagger-property/google';
import { BaseDto } from '@server/validators/base.dto';
import { IsOptional } from 'class-validator';

export class GoogleLoginDto extends BaseDto {
  @GoogleCredentialProperty({ required: true })
  @IsOptional()
  credential: string;
}
