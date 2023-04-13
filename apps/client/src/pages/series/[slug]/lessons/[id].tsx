import { Navbar } from '@client/components/courses/course/lessons/Navbar';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { Header } from '@client/components/layouts/header/Header';
import { Stack } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

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
        <Stack width={'100%'} height={620} bgcolor={'#010101'}>
          {loading && (
            <ReactPlayer
              width={'100%'}
              height={'100%'}
              controls
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          )}
        </Stack>
        <Stack></Stack>
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
