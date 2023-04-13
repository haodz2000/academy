import {
  Stack,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@mui/material';
import React from 'react';
import { MemeberItem } from './MemeberItem';

export const Members = () => {
  return (
    <Stack>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        width={'50%'}
        margin={'0 auto'}
      >
        <Typography variant="subtitle1" fontSize={36} textAlign="center">
          Follow in the footsteps of thousands of developers before you.
        </Typography>
      </Stack>
      <Stack
        flexWrap={'wrap'}
        flexDirection={'row'}
        gap={2}
        alignItems={'center'}
      >
        <Stack>
          <Stack
            position={'relative'}
            gap={10}
            sx={{
              ':before': {
                content: '""',
                height: '100%',
                width: '4px',
                background: '#328af11a',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: '0 auto',
              },
              ':after': {
                content: '""',
                height: '20px',
                width: '20px',
                borderRadius: '60%',
                top: '45%',
                background: '#328af11a',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: '0 auto',
              },
            }}
          >
            <MemeberItem />
            <MemeberItem />
          </Stack>
        </Stack>
        <Stack>
          <Stack
            position={'relative'}
            gap={10}
            sx={{
              ':before': {
                content: '""',
                height: '100%',
                width: '4px',
                background: '#328af11a',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: '0 auto',
              },
            }}
          >
            <MemeberItem />
            <MemeberItem />
            <MemeberItem />
          </Stack>
        </Stack>
        {Array.from(Array(9)).map((_, index) => (
          <Stack mt={index % 2 !== 0 && '150px'} key={index}>
            <Stack
              position={'relative'}
              gap={10}
              sx={{
                ':before': {
                  content: '""',
                  height: '100%',
                  width: '4px',
                  background: '#328af11a',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                },
                ':after': {
                  content: '""',
                  height: '20px',
                  width: '20px',
                  borderRadius: '60%',
                  top: '48%',
                  background: '#3995ff1a',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                },
              }}
            >
              <MemeberItem />
              <MemeberItem />
              <MemeberItem />
              <MemeberItem />
            </Stack>
          </Stack>
        ))}
        <Stack>
          <Stack
            position={'relative'}
            gap={8}
            sx={{
              ':before': {
                content: '""',
                height: '100%',
                width: '4px',
                background: '#328af11a',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: '0 auto',
              },
            }}
          >
            <MemeberItem />
            <MemeberItem />
            <MemeberItem />
          </Stack>
        </Stack>
        <Stack>
          <Stack
            position={'relative'}
            gap={8}
            sx={{
              ':before': {
                content: '""',
                height: '100%',
                width: '4px',
                background: '#328af11a',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: '0 auto',
              },
            }}
          >
            <MemeberItem />
            <MemeberItem />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
