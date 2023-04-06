import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const GoogleIdProperty = (
  options: ApiPropertyOptions = {
    example: '1234423123678126378',
  }
) => {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      ...options,
    })
  );
};

export const GoogleCsrfTokenProperty = (
  options: ApiPropertyOptions = {
    example: '8323185d28b7227d',
  }
) => {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      ...options,
    })
  );
};

export const GoogleCredentialProperty = (
  options: ApiPropertyOptions = {
    example: '8323185d28b7227d',
  }
) => {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      ...options,
    })
  );
};
