import { Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { CardTeacher } from './CardTeacher';
import { useTeachersQuery } from '@client/hooks/apis/users/useTeacherQuery';

export const Teachers = () => {
  const teachersQuery = useTeachersQuery();
  const teachers = useMemo(() => {
    return teachersQuery.data?.data ?? [];
  }, [teachersQuery.data?.data]);
  return (
    <Stack gap={12}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        width={'50%'}
        margin={'0 auto'}
      >
        <Typography variant="h1" fontWeight={500} fontSize={35}>
          Giảng viên
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
        {teachers.map((teacher, index) => (
          <CardTeacher teacher={teacher} key={index} isTop={index % 3 == 1} />
        ))}
      </Stack>
    </Stack>
  );
};
