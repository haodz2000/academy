import { GoogleSignInButton } from '@client/components/google/GoogleSignInButton';
import { useRenderGoogleSignIn } from '@client/components/google/hook';
import Link from '@client/components/ui/Link';
import { useAppSelector } from '@client/stores';
import { Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserDrawer } from '@client/components/drawer/UserDrawer';

interface Props {
  hasMenu: boolean;
}

interface IMenu {
  id: number;
  name: string;
  href: string;
}
const menu: IMenu[] = [
  {
    id: 0,
    name: 'Khóa học của tôi',
    href: '/my-learning-path',
  },
  {
    id: 1,
    name: 'Chủ đề',
    href: '/topics',
  },
  {
    id: 2,
    name: 'Khóa học',
    href: '/series',
  },
  {
    id: 3,
    name: 'Larabits',
    href: '/bits',
  },
  {
    id: 4,
    name: 'Quản lý',
    href: '/manage',
  },
  {
    id: 5,
    name: 'Blog',
    href: '/blogs',
  },
];

export const Header = ({ hasMenu }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  useRenderGoogleSignIn();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const menuActive = menu.findIndex((i) => router.asPath.includes(i.href));
    setValue(menuActive);
  }, [router.asPath]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Stack
      width={'100%'}
      top={0}
      height={80}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingX={3}
      zIndex={999}
      bgcolor={'#151f32'}
    >
      <Stack>
        <Typography
          component={Link}
          href={'/'}
          underline="none"
          fontSize={36}
          variant="h1"
          fontWeight={700}
        >
          𝓩𝓮𝓻𝓸3𝔃
        </Typography>
      </Stack>
      {hasMenu && (
        <Stack>
          <Tabs
            sx={{
              bgcolor: '#151f32',
              width: 'auto',
              color: '#FFF',
              '& .MuiTabs-indicator': {
                border: '2px solid #1890ff',
                borderRadius: '5px',
              },
            }}
            value={value}
            onChange={handleChange}
            centered
          >
            {menu.map((menu, index) => (
              <Tab
                key={index}
                href={menu.href}
                LinkComponent={Link}
                value={menu.id}
                sx={{
                  color: '#FFF',
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: 'none',
                }}
                label={menu.name}
              />
            ))}
          </Tabs>
        </Stack>
      )}
      <Stack>{!user ? <GoogleSignInButton /> : <UserDrawer />}</Stack>
    </Stack>
  );
};
