import { User } from '@libs/entities/entities/User';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
