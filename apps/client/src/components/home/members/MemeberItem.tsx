import { Avatar, colors, Tooltip } from '@mui/material';
import React from 'react';

export const MemeberItem = () => {
  return (
    <Tooltip title="H">
      <Avatar
        color={colors.blue[700]}
        sx={{
          width: '82px',
          height: '82px',
          boxShadow: `rgb(24 42 69) 0px 0px 0px 8px`,
          ':hover': {
            boxShadow: `#000 0px 0px 0px 8px`,
          },
        }}
      >
        H
      </Avatar>
    </Tooltip>
  );
};
