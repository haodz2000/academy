import React from 'react';
import { useConfirm } from 'material-ui-confirm';
import { Stack } from '@mui/material';
import { RoundedButton } from './buttons';
export const ConfirmDiaglog = () => {
  return (
    <Stack flexDirection={'row'} gap={1}>
      <RoundedButton>Cancel</RoundedButton>
      <RoundedButton>Accept</RoundedButton>
    </Stack>
  );
};
