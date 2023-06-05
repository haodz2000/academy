import { Members } from '@client/components/home/members';
import { Menu } from '@client/components/home/Menu';
import { Products } from '@client/components/home/products';
import { Teachers } from '@client/components/home/teachers';
import { Topics } from '@client/components/home/topics';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { withUnAuth } from '@client/hocs/withUnAuth';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { isSupported } from 'firebase/messaging';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';

const NotificationAlert = dynamic(
  () =>
    import('../components/home/NotificationAlert').then(
      (c) => c.NotificationAlert
    ),
  {
    ssr: false,
  }
);
export function Index() {
  const [isSupportWebpush, setIsSupportWebPush] = useState<boolean>(false);
  useEffect(() => {
    const checkSupprtWebpush = async () => {
      setIsSupportWebPush(await isSupported());
    };
    checkSupprtWebpush();
  }, []);
  return (
    <Stack width={'100%'} gap={5}>
      <Stack mb={2}>{isSupportWebpush && <NotificationAlert />}</Stack>
      <Stack
        position={'relative'}
        height={700}
        flexDirection={'row'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Image
          loader={({ src }) => src}
          src={'/images/background.svg'}
          alt="image"
          fill
          style={{ opacity: 0.8, objectFit: 'contain', position: 'absolute' }}
          unoptimized
        />
        <Stack zIndex={1}>
          <Typography variant="h1" fontSize={72} fontWeight={700}>
            The Modern
          </Typography>
          <Typography variant="h1" fontSize={72} fontWeight={700}>
            {`Developer's`}
          </Typography>
          <Typography
            sx={{
              color: `#21c8f6`,
            }}
            variant="h1"
            fontSize={72}
            fontWeight={700}
          >
            Screencast Haven
          </Typography>
        </Stack>
        <Menu />
      </Stack>
      <Topics />
      <Teachers />
      <Products />
      <Members />
    </Stack>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={false} custom={false}>
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = withUnAuth();

export default Index;
