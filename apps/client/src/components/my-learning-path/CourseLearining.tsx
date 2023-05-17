import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ForwardIcon from '@mui/icons-material/Forward';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
export const CourseLearining = () => {
  return (
    <Stack
      py={2}
      px={4}
      component={Paper}
      bgcolor="#18273f"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Avatar sx={{ height: 60, width: 60 }} />
        <Stack gap={1}>
          <Typography fontWeight={700}>Html,CSS,Javascript</Typography>
          <Stack position="relative" flexDirection="row" alignItems="center">
            <Stack flexDirection="row" alignItems="center">
              <Typography variant="caption">Series:</Typography>
              <Typography variant="caption">Laravel</Typography>
            </Stack>
            <Divider
              sx={{ bgcolor: '#FFF', height: 18, mx: 1 }}
              orientation="vertical"
            />
            <Stack flexDirection="row" alignItems="center">
              <Typography variant="caption">Published:</Typography>
              <Typography variant="caption">18/10/2000</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack flexDirection="row" alignItems={'center'} gap={1}>
        <Stack flexDirection="row" alignItems={'center'} gap={4} mr={2}>
          <Stack flexDirection="row" alignItems={'center'}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="caption">8m32s</Typography>
          </Stack>
          <Stack flexDirection="row" alignItems={'center'}>
            <AutoStoriesIcon fontSize="small" />
            <Typography variant="caption">5 video</Typography>
          </Stack>
        </Stack>
        <Avatar />
        <RoundedButton startIcon={<ForwardIcon />} sx={{ bgcolor: '#6a7ea3' }}>
          Học tiếp
        </RoundedButton>
        <RoundedButton
          startIcon={<StarOutlineIcon />}
          sx={{ bgcolor: '#797944' }}
        >
          Đánh giá
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
