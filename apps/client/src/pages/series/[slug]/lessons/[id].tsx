import { Navbar } from '@client/components/courses/course/lessons/Navbar';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { Header } from '@client/components/layouts/header/Header';
import { Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Discusstion } from '@client/components/courses/course/lessons/Discusstion';
import { Assigment } from '@client/components/courses/course/lessons/Assigment';

const Index = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <Stack position={'relative'} flexDirection={'row'} minHeight={1}>
      <Navbar />
      <Stack
        width={'calc(100vw - 330px)'}
        margin={'0 auto'}
        marginLeft={'330px'}
      >
        <Stack bgcolor={'red'} height={70} width={'100%'}>
          <Header hasMenu={false} />
        </Stack>
        <Stack width={'100%'} height={800} bgcolor={'#010101'}>
          {loading && (
            <ReactPlayer width={'100%'} height={'100%'} controls url="" />
          )}
        </Stack>
        <Stack
          width={'100%'}
          paddingX={'10%'}
          margin={'0 auto'}
          gap={2}
          paddingY={4}
        >
          <Paper
            sx={{
              paddingX: '10%',
              borderRadius: 5,
              paddingY: 2,
              backgroundImage: `url('/images/linear.jpeg'), linear-gradient(to left, #21c8f6,#637bff)`,
              backgroundSize: 'cover',
            }}
          >
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
              <Stack gap={8}>
                <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
                  <IconButton sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)' }}>
                    <FavoriteIcon sx={{ color: '#FFF' }} />
                  </IconButton>
                  <Typography variant="h1" fontSize={25} fontWeight={600}>
                    Larvel beginner
                  </Typography>
                </Stack>
                <Stack flexDirection={'row'} gap={3} minHeight={30}>
                  <Stack gap={1}>
                    <Typography fontSize={10}>Lesson</Typography>
                    <Typography fontWeight={600}>01</Typography>
                  </Stack>
                  <Divider color="#dbdbdb" orientation="vertical" />
                  <Stack gap={1}>
                    <Typography fontSize={10}>Time</Typography>
                    <Typography fontWeight={600}>1h6p</Typography>
                  </Stack>
                  <Divider color="#dbdbdb" orientation="vertical" />
                  <Stack gap={1}>
                    <Typography fontSize={10}>Published</Typography>
                    <Typography fontWeight={600}>
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Stack>
                  <Divider color="#dbdbdb" orientation="vertical" />
                  <Stack gap={1}>
                    <Typography fontSize={10}>Topic</Typography>
                    <Typography fontWeight={600}>AWS</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack></Stack>
            </Stack>
          </Paper>
        </Stack>
        <Stack flexDirection={'row'} width={'100%'} gap={1}>
          <Stack width={'60%'}>
            <Discusstion />
          </Stack>
          <Stack width={'40%'}>
            <Paper
              sx={{
                padding: 3,
                bgcolor: '#18273F',
                borderRadius: 3,
                ':hover': { bgcolor: 'rgba(63, 74, 92, 0.1)' },
              }}
            >
              <Stack gap={4}>
                <Typography variant="h3" fontSize={22} fontWeight={700}>
                  Bài tập
                </Typography>
                <Stack gap={3}>
                  <Assigment />
                  <Assigment />
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={false} custom={true}>
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
export default Index;
