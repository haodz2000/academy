import { Members } from '@client/components/home/members';
import { Menu } from '@client/components/home/Menu';
import { Products } from '@client/components/home/products';
import { Teachers } from '@client/components/home/teachers';
import { Topics } from '@client/components/home/topics';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Image from 'next/image';
import { ReactElement } from 'react';

export function Index() {
  return (
    <Stack width={'100%'} gap={5}>
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
          alt=""
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

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Index;
