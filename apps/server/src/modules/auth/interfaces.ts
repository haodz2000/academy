import { Scalar } from '@libs/constants/interfaces/scalar';

export interface JwtPayload {
  id: Scalar['integer'];
  iat: number;
  exp: number;
}
