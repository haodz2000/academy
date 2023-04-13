import { CourseItem } from '@client/components/courses/CourseItem';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { Topics } from '@client/components/topics';
import { Stack, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

export const Index = () => {
  return (
    <Stack gap={8}>
      <Stack padding={2} gap={12}>
        <Stack gap={4}>
          <Stack
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems="center"
          >
            <Typography variant="h1" fontWeight={'700'} fontSize={35}>
              Current Featured
            </Typography>
            <Typography variant="subtitle1">
              {"Here's what we're particularly excited to share with you!"}
            </Typography>
          </Stack>
          <Stack gap={4}>
            <CourseItem />
            <CourseItem />
          </Stack>
        </Stack>
        <Stack gap={4}>
          <Stack
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems="center"
          >
            <Typography variant="h1" fontWeight={'700'} fontSize={35}>
              Recently Updated
            </Typography>
            <Typography variant="subtitle1">{'Recently Updated'}</Typography>
          </Stack>
          <Stack gap={4}>
            <CourseItem />
            <CourseItem />
          </Stack>
        </Stack>
        <Stack gap={4}>
          <Stack
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems="center"
          >
            <Typography variant="h1" fontWeight={'700'} fontSize={35}>
              Hot Trending
            </Typography>
            <Typography variant="subtitle1">{'Hot vkl'}</Typography>
          </Stack>
          <Stack gap={4}>
            <CourseItem />
            <CourseItem />
          </Stack>
        </Stack>
      </Stack>
      <Topics />
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

export default Index;
