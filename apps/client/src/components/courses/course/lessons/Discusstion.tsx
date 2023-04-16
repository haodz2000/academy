import React from 'react';
import { Discuss } from './Discuss';
import { FormCreateDiscuss } from './FormCreateDiscuss';
import { Paper, Stack, Typography } from '@mui/material';

export const Discusstion = () => {
  return (
    <Paper sx={{ padding: 3, bgcolor: '#18273F', borderRadius: 3 }}>
      <Stack gap={2}>
        <Typography variant="h3" fontSize={22} fontWeight={700}>
          Thảo luận
        </Typography>
        <Stack
          gap={3}
          maxHeight={600}
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              width: '0em',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#203453',
              borderRadius: '50px',
            },
          }}
        >
          <Discuss />
          <Discuss />
          <Discuss />
          <Discuss />
        </Stack>
        <Stack>
          <FormCreateDiscuss />
        </Stack>
      </Stack>
    </Paper>
  );
};
