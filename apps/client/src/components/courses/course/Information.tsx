import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const Information = () => {
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
      <Stack minHeight={400} flexDirection={'row'} gap={2}>
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
          <Stack flexDirection="row" gap={3}>
            <RoundedButton
              size="large"
              sx={{ bgcolor: '#328AF11A' }}
              startIcon={<PlayCircleOutlineIcon />}
            >
              Start Series
            </RoundedButton>
            <RoundedButton
              size="large"
              sx={{ bgcolor: '#328AF11A' }}
              startIcon={<BookmarkBorderIcon />}
            >
              Add to Watchlist
            </RoundedButton>
          </Stack>
        </Stack>
        <Stack justifyContent={'center'} width={'30%'}>
          <Avatar
            src="https://ik.imagekit.io/laracasts/series/thumbnails/laravel-cookbook.png?tr=w-432"
            sx={{ height: 216, width: 216 }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
