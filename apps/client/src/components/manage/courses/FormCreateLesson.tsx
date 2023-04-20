import { RoundedButton } from '@client/components/ui/buttons';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

export const FormCreateLesson = () => {
  return (
    <Stack
      position="relative"
      gap={2}
      component="form"
      sx={{ bgcolor: '#328AF11A', p: 3 }}
    >
      <Stack>
        <Typography variant="h3" fontSize={22} fontWeight={700}>
          New lesson
        </Typography>
      </Stack>
      <Stack>
        <Typography>Title *</Typography>
        <FormControl>
          <TextField
            name="name"
            size="small"
            sx={{
              bgcolor: '#9494941a',
              '& fieldset': {
                border: 'none',
              },
            }}
            placeholder="Title lesson ..."
          />
        </FormControl>
      </Stack>
      <Stack>
        <Typography>Link *</Typography>
        <FormControl>
          <TextField
            name="name"
            size="small"
            sx={{
              bgcolor: '#9494941a',
              '& fieldset': {
                border: 'none',
              },
            }}
            placeholder="Title lesson ..."
          />
        </FormControl>
      </Stack>
      <Stack>
        <Typography>Time *</Typography>
        <FormControl>
          <TextField
            name="name"
            size="small"
            sx={{
              bgcolor: '#9494941a',
              '& fieldset': {
                border: 'none',
              },
            }}
            placeholder="Title lesson ..."
          />
        </FormControl>
      </Stack>
      <Stack gap={1} flexDirection="row" justifyContent="flex-end">
        <RoundedButton color="secondary">Reset</RoundedButton>
        <RoundedButton>Save</RoundedButton>
      </Stack>
    </Stack>
  );
};
