import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import Link from '../ui/Link';
import { LessonResponse } from '@libs/openapi-generator/generated';
import { useRouter } from 'next/router';

interface Props {
  lesson: LessonResponse;
  order: number;
}
export const LessonItem = ({ lesson, order }: Props) => {
  return (
    <Stack
      borderRadius={5}
      paddingX={2}
      paddingY={1}
      sx={{
        ':hover': {
          bgcolor: '#253D63',
        },
      }}
      bgcolor={'#18273F'}
      flexDirection={'row'}
      alignItems={'center'}
      gap={2}
    >
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Avatar sx={{ height: 62, width: 62, bgcolor: '#328af11A' }}>
          {order < 10 ? '0' + (order + 1) : order + 1 + ''}
        </Avatar>
      </Stack>
      <Stack gap={1} justifyContent="space-between">
        <Typography variant="h1" fontSize={20} fontWeight={600}>
          {lesson.title}
        </Typography>
      </Stack>
    </Stack>
  );
};
