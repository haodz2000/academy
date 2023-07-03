import { CourseResponse } from '@libs/openapi-generator/generated';
import { Chip, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  course: CourseResponse;
}
export const PriceCourse = ({ course }: Props) => {
  const isDiscount = course.course_price?.discount > 0;
  return (
    <Stack flexDirection="row" alignItems="center">
      {course.course_price?.price == 0 && (
        <Chip label={'Miễn phí'} sx={{ backgroundColor: '#64cf00' }} />
      )}
      {course.course_price?.price > 0 && (
        <Stack flexDirection="row" alignItems="flex-start" gap={1}>
          {isDiscount && (
            <Typography fontSize={16} fontWeight={600}>
              {(
                (course.course_price?.price * course.course_price?.discount) /
                100
              ).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
            </Typography>
          )}
          <Typography
            fontSize={isDiscount ? 13 : 16}
            color={isDiscount ? '#a3a3a3' : '#FFF'}
            fontWeight={600}
            sx={{
              textDecorationLine: isDiscount ? 'line-through' : 'initial',
            }}
          >
            {course.course_price?.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}{' '}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
