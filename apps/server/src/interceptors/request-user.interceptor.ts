import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

export const REQUEST_CONTEXT = '_requestContext';

@Injectable()
export class RequestUserInterceptor implements NestInterceptor {
  constructor(private type?: NonNullable<'query' | 'body' | 'param'>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    if (this.type && request[this.type]) {
      request[this.type][REQUEST_CONTEXT] = {
        userId: request.user.id,
        params: request.params,
      };
    }

    return next.handle();
  }
}
