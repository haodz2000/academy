import { RequestUserInterceptor } from '@server/interceptors';
import { StripRequestContextPipe } from '@server/pipes';
import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';

export function InjectUserToQuery() {
  return applyDecorators(InjectUserTo('query'));
}

export function InjectUserToBody() {
  return applyDecorators(InjectUserTo('body'));
}

export function InjectUserToParam() {
  return applyDecorators(InjectUserTo('param'));
}

export function InjectUserTo(type: 'query' | 'body' | 'param') {
  return applyDecorators(
    UseInterceptors(new RequestUserInterceptor(type)),
    UsePipes(StripRequestContextPipe)
  );
}
