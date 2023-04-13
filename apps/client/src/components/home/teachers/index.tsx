import { Stack, Typography } from '@mui/material';
import React from 'react';
import { CardTeacher } from './CardTeacher';

export const Teachers = () => {
  return (
    <Stack gap={12}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        width={'50%'}
        margin={'0 auto'}
      >
        <Typography variant="h1" fontWeight={500} fontSize={35}>
          Modern. Current. Expert Teachers.
        </Typography>
        <Typography variant="subtitle1" fontSize={15} textAlign="center">
          If you already know what {"you'"}re looking for, Laracasts is divided
          into various topics ranging from frameworks to packages to tools.
        </Typography>
      </Stack>
      <Stack
        padding={'0px 20px'}
        flexWrap={'wrap'}
        flexDirection={'row'}
        gap={7}
        justifyContent="center"
      >
        {Array.from(Array(12)).map((_, index) => (
          <CardTeacher key={index} isTop={index % 3 == 1} />
        ))}
      </Stack>
    </Stack>
  );
};
