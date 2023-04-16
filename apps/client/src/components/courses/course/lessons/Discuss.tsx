import Link from '@client/components/ui/Link';
import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';

export const Discuss = () => {
  return (
    <Stack flexDirection={'row'} width={'100%'} gap={2}>
      <Stack>
        <Avatar sx={{ height: 68, width: 68 }}>H</Avatar>
      </Stack>
      <Stack gap={1}>
        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography
            component={Link}
            href={'#'}
            underline="none"
            fontWeight={600}
          >
            Ta Huu Hao
          </Typography>
          <Typography color="#BAD9FB66" fontSize={10} fontWeight={600}>
            6h ago
          </Typography>
        </Stack>
        <Typography color="#D8E3EE">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo
          ex minus ducimus voluptate fugiat nihil quod nam mollitia omnis vel
          doloremque laudantium, quasi rem obcaecati beatae quibusdam earum
          assumenda.
        </Typography>
      </Stack>
    </Stack>
  );
};
