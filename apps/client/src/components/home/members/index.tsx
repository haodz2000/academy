import { Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { MemeberItem } from './MemeberItem';
import { usePublicUsersQuery } from '@client/hooks/apis/users/usePublicUsersQuery';
import { UserPublicResponse } from '@libs/openapi-generator/generated';

const splitArray = (data: UserPublicResponse[], x) => {
  const result = [];
  let sub_array: UserPublicResponse[] = [];
  let i = 0;
  for (const item of data) {
    sub_array.push(item);
    if (sub_array.length == x[i]) {
      result.push(sub_array);
      sub_array = [];
      i++;
    }
  }
  if (sub_array.length > 0) {
    result.push(sub_array);
  }
  return result as [UserPublicResponse[]];
};

export const Members = () => {
  const usersPublicQuery = usePublicUsersQuery();
  const users = useMemo(() => {
    const data = usersPublicQuery.data?.data ?? [];
    return splitArray(data, [2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2]);
  }, [usersPublicQuery.data?.data]);
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
        {users.map((data, index) => (
          <Stack
            key={index}
            mt={index > 2 && index < 11 && index % 2 !== 0 && '150px'}
          >
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
              {data.map((item, i) => (
                <MemeberItem user={item} key={i} />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
