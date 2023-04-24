import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from '@nestjs/common';

export class ValidationExceptionErrorResponse {
  @ApiProperty()
  type: string;

  @ApiProperty()
  message: string;
}

export class ValidationExceptionResponse {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: ValidationExceptionErrorResponse, isArray: true })
  errors: ValidationExceptionErrorResponse[];
}

export class ValidationExceptionHelper {
  static convert(errors: ValidationError[]): ValidationExceptionResponse[] {
    return errors.map((error) => {
      return {
        name: error.property,
        errors: error.constraints
          ? Object.keys(
              error.constraints
            ).map<ValidationExceptionErrorResponse>((type) => {
              return {
                type,
                message: error.constraints ? error.constraints[type] : '',
              };
            })
          : [],
      };
    });
  }
}
