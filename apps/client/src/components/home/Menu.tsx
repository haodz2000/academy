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
    url: '/',
    subtitle: 'Series',
    title: 'categories',
    topic: '// depp dives',
  },
  {
    url: '/',
    subtitle: 'Topics',
    title: 'find',
    topic: '// pick a category',
  },
  {
    url: '/',
    subtitle: 'Path',
    title: 'follow',
    topic: '// engine a community',
  },
  {
    url: '/',
    subtitle: 'Commercial',
    title: 'play',
    topic: '// watch our ad',
  },
  {
    url: '/',
    subtitle: 'Sign Up',
    title: 'join',
    topic: '// you know watch to do',
  },
];
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
