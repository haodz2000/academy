import { Avatar, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Link from '@client/components/ui/Link';

export const Course = () => {
  return (
    <Paper
      sx={{
        padding: 2,
        bgcolor: '#18273F',
        borderRadius: 3,
        ':hover': {
          bgcolor: 'rgb(25 48 78)',
        },
      }}
    >
      <Stack gap={2}>
        <Stack flexDirection="row" gap={2} justifyContent="flex-start">
          <Stack gap={1}>
            <Avatar>H</Avatar>
            <IconButton>
              <EditIcon htmlColor="#FFF" />
            </IconButton>
          </Stack>
          <Stack gap={1}>
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent="space-between"
            >
              <Typography
                variant="h3"
                fontSize={20}
                color="#FFFFFFE8"
                fontWeight={600}
              >
                Course
              </Typography>
              <Stack flexDirection="row">
                <Avatar>H</Avatar>
                <Avatar>H</Avatar>
                <Avatar>H</Avatar>
                <Avatar>+4</Avatar>
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Typography color={'#D8E3EE'} variant="subtitle1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
                sequi id ipsa odio ad doloribus vero vel at! Quasi harum enim
                voluptatibus officia asperiores modi dolorum, doloremque
                voluptates aliquam temporibus?
              </Typography>
              <Stack flexDirection="row" gap={1} alignItems="center">
                <Typography
                  fontSize={10}
                  variant="body2"
                  fontWeight={600}
                  color="#328AF1"
                >
                  Hao
                </Typography>
                <Typography fontSize={10} color={'#D8E3EE'} variant="body2">
                  cập nhật lúc {new Date().toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
