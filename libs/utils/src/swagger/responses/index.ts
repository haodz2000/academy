import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  AppApiErrorResponse,
  AppApiPaginatedResponse,
  AppApiSuccessResponse,
} from '@libs/utils/responses';

export const ApiSuccessResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto
) =>
  applyDecorators(
    ApiExtraModels(AppApiSuccessResponse, dataDto),
    ApiOkResponse({
      schema: {
        required: ['data'],
        allOf: [
          { $ref: getSchemaPath(AppApiSuccessResponse) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    })
  );

export const ApiPaginatedResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto
) =>
  applyDecorators(
    ApiExtraModels(AppApiPaginatedResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(AppApiPaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    })
  );

export const ApiErrorResponse = (
  statuses: HttpStatus[] = [HttpStatus.INTERNAL_SERVER_ERROR]
) => {
  const decorators: PropertyDecorator[] = [];
  for (const status of statuses) {
    switch (status) {
      case HttpStatus.UNPROCESSABLE_ENTITY:
        decorators.push(
          ApiNotFoundResponse({
            schema: { $ref: getSchemaPath(AppApiErrorResponse) },
          })
        );
        break;
      case HttpStatus.UNAUTHORIZED:
        decorators.push(
          ApiUnauthorizedResponse({
            schema: { $ref: getSchemaPath(AppApiErrorResponse) },
          })
        );
        break;
      case HttpStatus.FORBIDDEN:
        decorators.push(
          ApiForbiddenResponse({
            schema: { $ref: getSchemaPath(AppApiErrorResponse) },
          })
        );
        break;
      case HttpStatus.BAD_REQUEST:
        decorators.push(
          ApiBadRequestResponse({
            schema: { $ref: getSchemaPath(AppApiErrorResponse) },
          })
        );
        break;
      default:
        decorators.push(
          ApiInternalServerErrorResponse({
            schema: { $ref: getSchemaPath(AppApiErrorResponse) },
          })
        );
        break;
    }
  }
  return applyDecorators(ApiExtraModels(AppApiErrorResponse), ...decorators);
};
