import Link from '@client/components/ui/Link';
import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';

export const Lesson = () => {
  return (
    <Stack
      component={Link}
      underline="none"
      color={'inherit'}
      href={'#'}
      borderRadius={2}
      padding={1}
      bgcolor={'#328AF112'}
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
          Intro and Basics
        </Typography>
      </Stack>
    </Stack>
  );
};
