import { ValidationException } from '@server/exceptions';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ValidationError,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { get } from 'lodash';
import { AppApiErrorResponse } from '@libs/utils/responses';
import { v4 } from 'uuid';
import { ValidationExceptionHelper } from '@libs/utils/responses/validation-exception.responses';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private dontReports: Array<any> = [ValidationException, NotFoundException];

  catch(exception: HttpException | unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logException(exception, request);

    let status = 500;
    const message = this.getExceptionMessage(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    const errorResponse = AppApiErrorResponse.create(message, {
      error: process.env.NODE_ENV === 'production' ? null : exception,
      validationErrors:
        exception instanceof ValidationException
          ? ValidationExceptionHelper.convert(
              exception.getResponse() as ValidationError[]
            )
          : [],
      message: message,
      code: status,
      timestamp: new Date().toISOString(),
      traceId: v4(),
    });

    response.status(status).json(errorResponse);
  }

  protected getExceptionMessage(exception: HttpException | any): string {
    let message =
      get(exception, 'message') ||
      get(exception, 'response.message') ||
      'Internal Server Error';

    if (exception instanceof ValidationException) {
      message = 'Dữ liệu không hợp lệ.';
    }

    if (
      exception instanceof InternalServerErrorException &&
      process.env.NODE_ENV === 'production'
    ) {
      message = 'Đã có lỗi xảy ra.';
    }

    return message;
  }

  private logException(exception: unknown, request: Request) {
    if (this.shouldReportException(exception)) {
      Logger.error(`${request.method} ${request.url}`, 'HttpErrorFilter');
      console.log(exception);
    }
  }

  private dontReportException(exception: any) {
    return this.dontReports.some((e) => exception instanceof e);
  }

  private shouldReportException(exception: unknown) {
    return !this.dontReportException(exception);
  }
}
