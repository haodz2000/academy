import { Avatar, Collapse, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const Assigment = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Stack flexDirection="row" alignItems={'flex-start'} gap={2}>
      <Avatar>01</Avatar>
      <Stack gap={1}>
        <Stack flexDirection="row" gap={2} alignItems="center">
          <Typography variant="h6" fontWeight={600} fontSize={20}>
            Title
          </Typography>
          <IconButton onClick={handleClick}>
            {open ? (
              <ExpandLess htmlColor="#FFF" />
            ) : (
              <ExpandMore htmlColor="#FFF" />
            )}
          </IconButton>
        </Stack>
        <Collapse in={open}>
          <Typography color="#D8E3EE">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            repellendus aliquam reiciendis dolores quia quis saepe eaque eos
            voluptatum laboriosam cupiditate provident, error soluta quasi,
            porro iste tempora rem at!
          </Typography>
        </Collapse>
      </Stack>
    </Stack>
  );
};
