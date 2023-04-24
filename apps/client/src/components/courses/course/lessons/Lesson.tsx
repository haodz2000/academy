import Link from '@client/components/ui/Link';
import { LessonResponse } from '@libs/openapi-generator/generated';
import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  lesson: LessonResponse;
  currentId: number;
}
export const Lesson = ({ lesson, currentId }: Props) => {
  return (
    <Stack
      component={Link}
      underline="none"
      color={'inherit'}
      href={'#'}
      borderRadius={2}
      padding={1}
      bgcolor={lesson.id == currentId ? '#253D63' : '#328AF112'}
      sx={{
        ':hover': {
          bgcolor: '#253D63',
        },
      }}
      flexDirection={'row'}
      gap={1}
    >
      <Stack
        flexDirection={'row'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Avatar sx={{ height: 32, width: 32, bgcolor: '#328af11A' }}>01</Avatar>
        <Typography variant="h1" fontSize={14} fontWeight={600}>
          {lesson?.title}
        </Typography>
      </Stack>
    </Stack>
  );
};
