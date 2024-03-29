import { colors, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import { MenuItem } from './MenuItem';

export interface IMenu {
  url: string;
  subtitle: string;
  title: string;
  topic: string;
}
const menu: IMenu[] = [
  {
    url: '/topics',
    subtitle: 'Chủ đề',
    title: 'Danh mục',
    topic: '// depp dives',
  },
  {
    url: '/series',
    subtitle: 'Khóa học',
    title: 'Chủ đề ',
    topic: '// pick a course',
  },
  {
    url: '/my-learning-path',
    subtitle: 'Khóa học của tôi',
    title: 'Đang học',
    topic: '// engine a community',
  },
  {
    url: '#',
    subtitle: 'Bài viết',
    title: 'Thảo luận',
    topic: '// watch our ad',
  },
  {
    url: '/manage/courses',
    subtitle: 'Quản lý',
    title: 'Tham gia',
    topic: '// you know watch to do',
  },
];
const Keyframes = styled(Stack)({
  '@keyframes pulsate': {
    '0%': {
      marginLeft: 1,
    },
    '25%': {
      marginLeft: 2,
    },
    '50%': {
      marginRight: 2,
    },
    '100%': {
      marginBotom: 2,
    },
  },
  animation: 'pulsate 3s infinite ease',
});

export const Menu = () => {
  const stats: IMenu[] = [
    {
      url: '/',
      subtitle: '181',
      title: 'series',
      topic: '// multi-episode training',
    },
    {
      url: '/',
      subtitle: '2704',
      title: 'lessons',
      topic: '// new ones every week',
    },
    {
      url: '/',
      subtitle: '420',
      title: 'hour',
      topic: '// hour and hours of content',
    },
  ];
  return (
    <Keyframes
      bgcolor={'#000'}
      borderRadius={4}
      padding={2}
      width={300}
      height={600}
      mr={6}
    >
      <Stack>
        <Stack flexDirection={'row'} mb={1}>
          <Typography color={colors.red['600']} fontWeight={700}>
            {'"Menu"'}
          </Typography>
          <Typography fontWeight={700}>{'=> ['}</Typography>
        </Stack>
        <Stack gap={2}>
          {menu.map((i, index) => (
            <MenuItem menu={i} key={index} />
          ))}
        </Stack>
        <Stack mt={1}>
          <Typography fontWeight={700}>{'],'}</Typography>
        </Stack>
      </Stack>
      <Stack>
        <Stack flexDirection={'row'} mb={1}>
          <Typography color={colors.red['600']} fontWeight={700}>
            {'"Stats"'}
          </Typography>
          <Typography fontWeight={700}>{'=> ['}</Typography>
        </Stack>
        <Stack gap={2}>
          {stats.map((i, index) => (
            <MenuItem menu={i} key={index} />
          ))}
        </Stack>
        <Stack mt={1}>
          <Typography fontWeight={700}>{'],'}</Typography>
        </Stack>
      </Stack>
    </Keyframes>
  );
};
