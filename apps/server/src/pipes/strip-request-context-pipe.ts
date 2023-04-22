import { omit } from 'lodash';
import { REQUEST_CONTEXT } from '@server/interceptors';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StripRequestContextPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return omit(value, [REQUEST_CONTEXT]);
    }
    return value;
  }
}
