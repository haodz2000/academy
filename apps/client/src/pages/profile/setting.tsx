import { AppLayout } from '@client/components/layouts/AppLayout';
import { withAuth } from '@client/hocs/withAuth';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { ReactElement, useMemo } from 'react';
import { UpdateUserForm } from '@client/components/profile/UpdateUserForm';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { useProfileUserQuery } from '@client/hooks/apis/users/useProfileQuery';

const ProfilePage = () => {
  const profileQuery = useProfileUserQuery();
  const user = useMemo(() => {
    return profileQuery.data?.data;
  }, [profileQuery.data?.data]);
  if (profileQuery.isLoading) {
    return <LoadingPage />;
  }
  if (profileQuery.error) {
    return <ErrorPage />;
  }
  return (
    <Stack gap={2}>
      <Stack
        width={1}
        p={1}
        gap={2}
        alignItems="center"
        justifyContent="center"
        position={'relative'}
      >
        <Stack position={'absolute'} right={'35%'}>
          <Image
            loader={({ src }) => src}
            alt="image"
            src={'https://laracasts.com/images/settings/gears.svg'}
            unoptimized
            width={120}
            height={120}
            style={{ objectFit: 'contain' }}
          />
        </Stack>
        <Typography variant="h4" fontWeight={700}>
          Thiết lập tài khoản
        </Typography>
        <Typography variant="h6" fontSize={16} fontWeight={500}>
          Cần tinh chỉnh một cài đặt
        </Typography>
      </Stack>
      <Stack width={1} padding={'30px 75px'}>
        {user && <UpdateUserForm user={user} />}
        <Stack></Stack>
      </Stack>
    </Stack>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={true} custom={false}>
      {page}
    </AppLayout>
  );
};
export const getServerSideProps = withAuth();

export default ProfilePage;
