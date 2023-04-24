import { Topics } from '@client/components/home/topics';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { withUnAuth } from '@client/hocs/withUnAuth';
import { Stack } from '@mui/material';
import React, { ReactElement } from 'react';

const Index = () => {
  return (
    <Stack gap={3}>
      <Topics />
    </Stack>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={false} custom={false}>
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = withUnAuth();

export default Index;
