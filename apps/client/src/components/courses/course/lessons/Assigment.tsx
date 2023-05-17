import { Avatar, Collapse, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AssignmentResponse } from '@libs/openapi-generator/generated';

interface Props {
  assignment: AssignmentResponse;
  order: number;
}
export const Assigment = ({ assignment, order }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Stack flexDirection="row" alignItems={'flex-start'} gap={2}>
      <Avatar>{order}</Avatar>
      <Stack gap={1}>
        <Stack flexDirection="row" gap={2} alignItems="center">
          <Typography variant="h6" fontWeight={600} fontSize={20}>
            {assignment.title}
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
          <Typography color="#D8E3EE">{assignment.description}</Typography>
        </Collapse>
      </Stack>
    </Stack>
  );
};
