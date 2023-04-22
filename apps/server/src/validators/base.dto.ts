import { Allow } from 'class-validator';
import { REQUEST_CONTEXT } from '@server/interceptors';

export class BaseDto {
  @Allow()
  [REQUEST_CONTEXT]?: object;
}
