import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { ValidationExceptionResponse } from '@libs/utils/responses/validation-exception.responses';

class ApiError {
  constructor(error: Partial<ApiError>) {
    this.error = error.error ?? null;
    this.traceId = error.traceId = v4();
    this.code = error.code || 500;
    this.message = error.message || 'Internal Server Error';
    this.validationErrors = error.validationErrors ?? [];
    this.timestamp = error.timestamp ?? new Date().toISOString();
  }

  @ApiProperty({ required: false, nullable: true })
  error: unknown | null = null;

  @ApiProperty()
  traceId: string;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ isArray: true, type: ValidationExceptionResponse })
  validationErrors: ValidationExceptionResponse[];

  @ApiProperty()
  timestamp: string;
}

export class AppApiErrorResponse {
  @ApiProperty()
  error: ApiError | undefined;

  @ApiProperty({ type: 'string' })
  message = 'Internal Server Error';

  static create(message: string, error?: ApiError): AppApiErrorResponse {
    const apiErrorResponse = new AppApiErrorResponse();
    apiErrorResponse.message = message;
    if (error) apiErrorResponse.error = new ApiError(error);
    return apiErrorResponse;
  }
}
