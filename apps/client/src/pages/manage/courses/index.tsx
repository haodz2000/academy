import { AppLayout } from '@client/components/layouts/AppLayout';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { Course } from '@client/components/manage/courses/Course';
import { RoundedButton } from '@client/components/ui/buttons';
import { Stack } from '@mui/material';
import React, { ReactElement } from 'react';

const Index = () => {
  return (
    <Stack width={'100%'} paddingX={2} flexDirection={'row'} gap={2}>
      <Stack width={'30%'}>
        <Stack width={220}>
          <NavbarManage>
            <RoundedButton>New course</RoundedButton>
          </NavbarManage>
        </Stack>
      </Stack>
      <Stack width={'70%'}>
        <Stack paddingX={2} gap={2}>
          <Stack gap={2}>
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
          </Stack>
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
