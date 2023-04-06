import { GoogleCredentialProperty } from '@libs/swagger-property/google';

export class GoogleLoginDto {
  @GoogleCredentialProperty({ required: true })
  credential: string;
}
