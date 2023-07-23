import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from 'next/link';

export const Footer = () => {
  return (
    <Stack
      width={'100%'}
      sx={{
        backgroundImage: `radial-gradient(circle at 15% -3%,#365280,#080e17 116%)`,
      }}
      height={740}
      position={'relative'}
    >
      <Stack
        maxWidth={'1350px'}
        width={'100%'}
        margin={'0 auto'}
        position={'relative'}
      >
        <Stack position={'absolute'} gap={5} justifyContent={'space-between'}>
          <Image
            loader={({ src }) => src}
            alt="image"
            src={'https://laracasts.com/images/mic-drop@2x.webp'}
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </Stack>
        <Stack
          gap={2}
          zIndex={1}
          width={'60%'}
          margin={'0 auto'}
          alignItems={'center'}
          justifyContent={'center'}
          padding={10}
        >
          <Typography
            textAlign={'center'}
            variant="h3"
            fontSize={33}
            fontWeight={600}
          >
            Want us to email you occasionally with 𝓩𝓮𝓻𝓸3𝔃 news?
          </Typography>
          <Stack width={'80%'} flexDirection={'row'} gap={1}>
            <FormControl fullWidth>
              <TextField
                color="info"
                placeholder="Enter your email address"
                sx={(theme) => ({
                  bgcolor: '#3b3b3b',
                  borderRadius: '16px',
                  '& fieldset': {
                    border: 'none',
                  },
                })}
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{ borderRadius: '20px', fontWeight: 600 }}
              color="primary"
            >
              Subscribe
            </Button>
          </Stack>
        </Stack>
        <Stack mb={10} flexDirection={'row'}>
          <Grid container>
            <Grid item xs={6} padding={1}>
              <Stack width={'65%'} gap={3}>
                <Typography variant="h1" fontSize={44} fontWeight={700}>
                  𝓩𝓮𝓻𝓸3𝔃
                </Typography>
                <Typography variant="subtitle2">
                  Nine out of ten doctors recommend 𝓩𝓮𝓻𝓸3𝔃 over competing
                  brands. Come inside, see for yourself, and massively level up
                  your development skills in the process.
                </Typography>
                <Stack flexDirection={'row'}>
                  <IconButton>
                    <Tooltip title="Youtobe">
                      <YouTubeIcon fontSize="large" color="error" />
                    </Tooltip>
                  </IconButton>
                  <IconButton>
                    <Tooltip title="Facebook">
                      <FacebookIcon fontSize="large" color="primary" />
                    </Tooltip>
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={2} zIndex={999}>
              <Stack gap={3}>
                <Typography variant="h6" fontWeight={700}>
                  Learn
                </Typography>
                <Stack gap={1}>
                  <Typography color={'#BAD9FC80'}>Sign In</Typography>
                  <Typography
                    component={Link}
                    href={'/series'}
                    color={'#BAD9FC80'}
                  >
                    Series
                  </Typography>
                  <Typography
                    component={Link}
                    href={'/my-learning-path'}
                    color={'#BAD9FC80'}
                  >
                    Learning path
                  </Typography>
                  <Typography
                    component={Link}
                    href={'/topics'}
                    color={'#BAD9FC80'}
                  >
                    Categories
                  </Typography>
                  <Typography
                    component={Link}
                    href={'/topics'}
                    color={'#BAD9FC80'}
                  >
                    Topics
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack gap={3}>
                <Typography variant="h6" fontWeight={700}>
                  Discuss
                </Typography>
                <Stack gap={1}>
                  <Typography color={'#BAD9FC80'}>Sign Up</Typography>
                  <Typography color={'#BAD9FC80'}>Series</Typography>
                  <Typography color={'#BAD9FC80'}>Learning path</Typography>
                  <Typography color={'#BAD9FC80'}>Categories</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Stack gap={3}>
                <Typography variant="h6" fontWeight={700}>
                  Extras
                </Typography>
                <Stack gap={1}>
                  <Typography color={'#BAD9FC80'}>Sign Up</Typography>
                  <Typography color={'#BAD9FC80'}>Series</Typography>
                  <Typography color={'#BAD9FC80'}>Learning path</Typography>
                  <Typography color={'#BAD9FC80'}>Categories</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Divider sx={{ bgcolor: 'rgba(186,217,252,.1)' }} />
        <Stack width={'40%'} margin={'0 auto'}>
          <Typography fontSize={12} textAlign={'center'}>
            © 𝓩𝓮𝓻𝓸3𝔃 2023. All rights reserved. Yes, all of them. That means
            you, Todd. Proudly hosted with Laravel Forge and DigitalOcean .
          </Typography>
        </Stack>
      </Stack>
      <Stack zIndex={0} width={'50%'} height={1} position="absolute">
        <Image
          loader={({ src }) => src}
          alt="image"
          src={'/images/bg-footer2.png'}
          fill
          style={{ objectFit: 'contain' }}
          unoptimized
        />
      </Stack>
      <Stack right={0} zIndex={0} width={'50%'} height={1} position="absolute">
        <Image
          loader={({ src }) => src}
          alt="image"
          src={'/images/bg-footer.png'}
          fill
          style={{ objectFit: 'contain' }}
          unoptimized
        />
      </Stack>
    </Stack>
  );
};
