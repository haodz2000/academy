import { Stack, Typography } from '@mui/material';
import React from 'react';
import { Section } from './Section';

export const ListSection = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h6" fontWeight={600}>
        List Section
      </Typography>
      <Stack gap={1}>{/* <Section /> */}</Stack>
    </Stack>
  );
};
