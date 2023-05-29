import { Box, BoxProps } from '@mui/material';
import React from 'react';
import { RoundedButton } from './buttons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

export const Back = ({ ...props }: BoxProps) => {
  const router = useRouter();
  return (
    <Box {...props}>
      <RoundedButton
        onClick={() => router.back()}
        sx={{ bgcolor: '#328AF11A' }}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </RoundedButton>
    </Box>
  );
};
