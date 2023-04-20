import { RoundedButton } from '@client/components/ui/buttons';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

export const FormCreateSection = () => {
  return (
    <Stack
      position="relative"
      gap={2}
      component="form"
      sx={{ bgcolor: '#328AF11A', p: 3 }}
    >
      <Stack>
        <Typography variant="h3" fontSize={22} fontWeight={700}>
          New Section
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Stack>
          <Typography> Title *</Typography>
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
              placeholder="Name course ..."
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Descripton</Typography>
          <FormControl>
            <TextField
              name="description"
              size="small"
              multiline
              minRows={4}
              sx={{
                bgcolor: '#9494941a',
                '& fieldset': {
                  border: 'none',
                },
              }}
              placeholder="Name course ..."
            />
          </FormControl>
        </Stack>
        <Stack gap={1} justifyContent="flex-end" flexDirection={'row'}>
          <RoundedButton color="secondary">Reset</RoundedButton>
          <RoundedButton>Save</RoundedButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
