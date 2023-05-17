import { Stack, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import Link from '@client/components/ui/Link';
import { useRouter } from 'next/router';

interface Menu {
  title: string;
  href: string;
}
const menu: Menu[] = [
  {
    title: 'Người dùng',
    href: '/manage/users',
  },
  {
    title: 'Khóa học',
    href: '/manage/courses',
  },
  {
    title: 'Yêu cầu dạy học',
    href: '/manage/teaching-requests',
  },
  {
    title: 'Yêu cầu tham gia học',
    href: '/manage/learning-requests',
  },
];

export const NavbarManage = ({ children }: PropsWithChildren) => {
  const path = useRouter().asPath;
  return (
    <Stack width={1} gap={2}>
      <Stack width={1}>{children}</Stack>
      <Stack gap={1}>
        {menu.map((i, index) => (
          <Stack
            key={index}
            position="relative"
            component={Link}
            underline="none"
            href={i.href}
            paddingX={3}
            paddingY={1}
            borderRadius={2}
            bgcolor={path.includes(i.href) && '#328af11A'}
            sx={(theme) => ({
              '.text': {
                color: path.includes(i.href) ? '#328AF1' : '#FFFFFFD9',
              },
              ':after': {
                content: '""',
                width: '8px',
                height: '60%',
                bgcolor: path.includes(i.href) ? '#328af1' : '#328af11A',
                position: 'absolute',
                top: 7,
                left: 5,
                borderRadius: 20,
              },
              ':hover': {
                cursor: 'pointer',
                bgcolor: '#328af11A',
                ':after': {
                  bgcolor: '#328AF1',
                  transition: 'background 0.8s',
                },
                '.text': {
                  color: '#328AF1',
                  transition: 'color 0.5s',
                },
              },
            })}
          >
            <Typography fontWeight={500} className="text">
              {i.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
