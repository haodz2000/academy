import Link from '@client/components/ui/Link';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export const TopicItem = () => {
  return (
    <Paper
      sx={{
        width: '190px',
        height: '80px',
        bgcolor: '#18273F',
        ':hover': {
          bgcolor: '#203453',
        },
      }}
      elevation={0}
    >
      <Stack
        height={1}
        component={Link}
        underline="none"
        color="inherit"
        href={'#'}
        gap={2}
        padding={1}
        flexDirection={'row'}
        alignItems="center"
      >
        <Avatar src="https://res.cloudinary.com/dhjrftwo1/image/upload/v1680934014/topics/webpack-logo_gmidfo" />
        <Stack>
          <Typography variant="subtitle1" fontSize={15} fontWeight={600}>
            Authentication
          </Typography>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography
              variant="body2"
              fontSize={9}
              fontWeight={600}
              color="#bad9fc7f"
            >
              2 courses
            </Typography>
            <Typography>&diams;</Typography>
            <Typography
              variant="body2"
              fontSize={9}
              fontWeight={600}
              color="#bad9fc7f"
            >
              108 videos
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
