import { AppLayout } from '@client/components/layouts/AppLayout';
import { withAuth } from '@client/hocs/withAuth';
import { Stack } from '@mui/material';
import Image from 'next/image';
import React, { ReactElement } from 'react';
const src =
  'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80';
const ProfilePage = () => {
  return (
    <Stack>
      <Stack width={'100%'} height={350}>
        <Stack width="70%" height={350} position={'relative'} margin={'0 auto'}>
          <Image
            loader={({ src }) => src}
            alt=""
            src={src}
            fill
            unoptimized
            style={{ borderRadius: '20px', boxShadow: '1px 1px 1px 1px #DFFF' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={true} custom={true}>
      {page}
    </AppLayout>
  );
};
export const getServerSideProps = withAuth();

export default ProfilePage;
