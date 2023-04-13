import { colors, Stack, Typography } from '@mui/material';
import React from 'react';
import { IMenu } from './Menu';
import Link from '@client/components/ui/Link';

interface Props {
  menu: IMenu;
}
export const MenuItem = ({ menu }: Props) => {
  return (
    <Stack
      component={Link}
      underline="none"
      href={menu.url}
      position={'relative'}
      paddingX={2}
      zIndex={1}
      borderRadius={1}
      sx={(theme) => ({
        ':after': {
          content: '""',
          width: '4px',
          height: '18px',
          bgcolor: '#1a253a',
          position: 'absolute',
          top: 0,
          left: -10,
          borderRadius: 1,
        },
        ':before': {
          content: '""',
          width: '4px',
          height: '18px',
          bgcolor: '#1a253a',
          position: 'absolute',
          bottom: 0,
          left: -10,
          borderRadius: 1,
        },
        ':hover': {
          cursor: 'pointer',
          bgcolor: colors.blue[700],
          ':after': {
            bgcolor: 'blue',
            transition: 'background 0.8s',
          },
          ':before': {
            bgcolor: 'blue',
            transition: 'background 0.8s',
          },
          '.a': {
            color: '#fff',
          },
        },
      })}
    >
      <Typography
        variant="body2"
        fontWeight={600}
        fontSize={10}
        color={'#9ba0aa'}
      >
        {menu.topic}
      </Typography>
      <Stack flexDirection={'row'}>
        <Typography variant="subtitle1" color={'#FFF'} fontWeight={700}>
          {`"${menu.title}"=>`}
        </Typography>
        <Typography
          className="a"
          variant="subtitle1"
          fontWeight={700}
          color={colors.blue[600]}
        >
          {`"${menu.subtitle}"`}
        </Typography>
      </Stack>
    </Stack>
  );
};
