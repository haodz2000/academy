import Link from '@client/components/ui/Link';
import { LessonResponse } from '@libs/openapi-generator/generated';
import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  lesson: LessonResponse;
}
export const Lesson = ({ lesson }: Props) => {
  return (
    <Stack
      component={Link}
      underline="none"
      color={'inherit'}
      href={'#'}
      height={145}
      borderRadius={5}
      padding={2}
      sx={{
        ':hover': {
          bgcolor: '#253D63',
        },
      }}
      bgcolor={'#18273F'}
      flexDirection={'row'}
      gap={2}
    >
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Avatar sx={{ height: 62, width: 62, bgcolor: '#328af11A' }}>01</Avatar>
      </Stack>
      <Stack gap={1} justifyContent="space-between">
        <Typography variant="h1" fontSize={20} fontWeight={600}>
          {lesson.title}
        </Typography>
        <Typography variant="body2">{lesson.description}</Typography>
        <Stack flexDirection="row">
          <Typography fontSize={10} variant="body2">
            Time: {lesson.time}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
