import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import { FC, PropsWithChildren } from 'react';
import { Header } from './header/Header';
import { Footer } from './footer';

const NotificationGroup = dynamic<unknown>(() =>
  import('@client/components/notification/NotificationGroup').then(
    (comp) => comp.NotificationGroup
  )
);

interface Props extends PropsWithChildren {
  hasMenu: boolean;
  custom: boolean;
}

export const AppLayout: FC<Props> = ({ children, hasMenu, custom }) => {
  return (
    <Stack
      width={'100%'}
      height={'100vh'}
      sx={{
        background: '#151f32',
        '&::-webkit-scrollbar': {
          width: '0.7em',
        },
        overflowY: 'scroll',
        '&::-webkit-scrollbar-track': {
          background: '#5f6c80',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#203453',
          borderRadius: '50px',
        },
      }}
    >
      {!custom ? (
        <Stack width={'100%'} sx={{ margin: '0 auto' }}>
          <Header hasMenu={hasMenu} />
          <Stack
            maxWidth={'1350px'}
            width={'100%'}
            padding={2}
            margin={'0px auto'}
          >
            {children}
          </Stack>
          <Footer />
        </Stack>
      ) : (
        <Stack width={'100%'} sx={{ margin: '0 auto' }}>
          {children}
        </Stack>
      )}
      <NotificationGroup />
    </Stack>
  );
};
