import { RoundedButton } from '@client/components/ui/buttons';
import { LessonResponse } from '@libs/openapi-generator/generated';
import { FormControl, Stack, TextField } from '@mui/material';
import React from 'react';

interface Props {
  lesson: LessonResponse;
}
export const FormCreateDiscuss = ({ lesson }: Props) => {
  return (
    <Stack gap={1}>
      <FormControl>
        <TextField placeholder="Write something..." multiline minRows={3} />
      </FormControl>
      <Stack flexDirection={'row'} justifyContent="flex-end">
        <RoundedButton sx={{ bgcolor: '#151f32', color: '#fff' }}>
          Submit
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
