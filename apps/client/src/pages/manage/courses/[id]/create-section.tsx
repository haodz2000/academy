import { AppLayout } from '@client/components/layouts/AppLayout';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { FormCreateSection } from '@client/components/manage/courses/FormCreateSection';
import { HeaderInformation } from '@client/components/manage/courses/HeaderInformation';
import { ListSection } from '@client/components/manage/courses/ListSection';
import { RoundedButton } from '@client/components/ui/buttons';
import { Stack } from '@mui/material';
import React, { ReactElement } from 'react';

const Index = () => {
  return (
    <Stack width={'100%'} paddingX={2} flexDirection={'row'} gap={2}>
      <Stack width={'30%'}>
        <Stack width={220}>
          <NavbarManage>
            <RoundedButton>Quay lai</RoundedButton>
          </NavbarManage>
        </Stack>
      </Stack>
      <Stack width={'70%'}>
        <Stack paddingX={2} gap={1}>
          <HeaderInformation />
          <FormCreateSection />
          <ListSection />
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
