import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const HeaderInformation = () => {
  return (
    <Stack gap={1}>
      <Box>
        <RoundedButton
          sx={{ bgcolor: '#328AF11A' }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </RoundedButton>
      </Box>
      <Stack flexDirection={'row'} gap={2}>
        <Stack width={'70%'} gap={2} justifyContent={'space-between'}>
          <Stack gap={2}>
            <Typography variant="h1" fontSize={33} fontWeight={600}>
              Laravel Beginner
            </Typography>
            <Stack flexDirection={'row'} gap={1}>
              <RoundedButton sx={{ bgcolor: '#328AF11A' }}>
                Frameworks
              </RoundedButton>
            </Stack>
            <Stack>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut
                temporibus obcaecati, sit, dolorem tempore ex ea at deleniti
                odio praesentium, nihil harum laboriosam culpa libero.
                Perferendis nemo soluta tempore.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent={'flex-start'} width={'30%'}>
          <Avatar
            src="https://ik.imagekit.io/laracasts/series/thumbnails/laravel-cookbook.png?tr=w-432"
            sx={{ height: 216, width: 216 }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
