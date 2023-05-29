import { UserPublicResponse } from '@libs/openapi-generator/generated';
import { Avatar, colors, Tooltip } from '@mui/material';
import React from 'react';
import { TooltipDrop } from './TooltipDrop';

interface Props {
  user: UserPublicResponse;
}
export const MemeberItem = ({ user }: Props) => {
  return (
    <Tooltip
      sx={{ '&.MuiTooltip-popper': { bgcolor: '#151f32' } }}
      title={<TooltipDrop user={user} />}
    >
      <Avatar
        src={user?.avatar.path}
        color={colors.blue[700]}
        sx={{
          width: '82px',
          height: '82px',
          boxShadow: `rgb(24 42 69) 0px 0px 0px 8px`,
          ':hover': {
            boxShadow: `#000 0px 0px 0px 8px`,
          },
          objectFit: 'cover',
        }}
      >
        {user.name}
      </Avatar>
    </Tooltip>
  );
};
