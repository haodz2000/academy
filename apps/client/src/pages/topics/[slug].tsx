import { CourseItem } from '@client/components/courses/CourseItem';
import { Topics } from '@client/components/home/topics';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { Stack, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

const Index = () => {
  return (
    <Stack gap={3}>
      <Topics />
      <Stack gap={6}>
        <Stack margin={'0 auto'} flexDirection={'row'} gap={1}>
          <Typography fontSize={33}>Exploring</Typography>
          <Typography fontSize={33} color={'blue'}>
            {'//AlpineJS'}
          </Typography>
        </Stack>
        <Stack gap={4}>
          <CourseItem />
          <CourseItem />
        </Stack>
      </Stack>
    </Stack>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={true} custom={false}>
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
