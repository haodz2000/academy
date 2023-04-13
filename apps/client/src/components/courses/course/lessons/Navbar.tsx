import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RoundedButton } from '@client/components/ui/buttons';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Section } from './Section';

export const Navbar = () => {
  return (
    <Stack
      width={330}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor="#0D131D"
      zIndex={999}
      padding={1}
      gap={1}
      height={1}
    >
      <Stack flexDirection="row" alignItems="center" height={60}>
        <Box>
          <RoundedButton
            sx={{ bgcolor: '#328AF11A' }}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </RoundedButton>
        </Box>
      </Stack>
      <Stack gap={2}>
        <Stack height={60} flexDirection="row" alignItems="center" gap={2}>
          <Avatar sx={{ height: 59, width: 59 }} />
          <Stack gap={1}>
            <Typography variant="h3" fontSize={18} fontWeight={600}>
              Laravel beginer
            </Typography>
            <Stack height={15} flexDirection="row" alignItems="center" gap={2}>
              <Stack gap={1} flexDirection="row" alignItems="center">
                <AutoStoriesIcon fontSize="small" />
                <Typography fontSize={12}>05 lessons</Typography>
              </Stack>
              <Divider color="#FFF" orientation="vertical" />
              <Stack gap={1} flexDirection="row" alignItems="center">
                <AccessTimeIcon fontSize="small" />
                <Typography fontSize={12}>5h</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          paddingRight={1}
          sx={{
            overflowY: 'scroll',
            height: 'calc(100vh - 120px)',
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
          <Section />
          <Section />
          <Section />
          <Section />
          <Section />
          <Section />
          <Section />
        </Stack>
      </Stack>
    </Stack>
  );
};
