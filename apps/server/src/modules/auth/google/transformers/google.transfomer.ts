import { BaseResponseTransformer } from '@server/transformers/responses/base-response.transformer';
import { GoogleLoginResponse } from '@server/modules/auth/google/responses/google-login.response';

export class GoogleTransformer extends BaseResponseTransformer {
  static toGoogleLoginResponse(googleLoginResponse: {
    token: string;
  }): GoogleLoginResponse {
    return {
      ...googleLoginResponse,
    };
  }
}
