import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

class ApiError {
  constructor(error: Partial<ApiError>) {
    this.error = error.error ?? null;
    this.traceId = error.traceId = v4();
    this.code = error.code || 'InternalServerError';
    this.message = error.message || 'Internal Server Error';
    this.validationErrors = error.validationErrors ?? [];
    this.timestamp = error.timestamp ?? new Date().toISOString();
  }

  @ApiProperty({ required: false, nullable: true })
  error: object | null = null;

  @ApiProperty()
  traceId: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ isArray: true, type: 'object' })
  validationErrors: object[];

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
