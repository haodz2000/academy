import {
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { LessonItem } from './LessonItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const SectionItem = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Stack gap={2}>
      <Stack
        flexDirection={'row'}
        alignItems="center"
        justifyContent={'space-between'}
        bgcolor={'#18273F'}
        height={65}
        borderRadius={5}
        padding={2}
        width={'100%'}
      >
        <Stack gap={2} height={1} flexDirection={'row'} alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Section 1
          </Typography>
          <Divider color="#9b9b9b" orientation="vertical" />
          <Typography variant="subtitle1" fontWeight={600}>
            Content
          </Typography>
        </Stack>
        <Stack>
          <IconButton onClick={handleClick}>
            {open ? (
              <ExpandLess fontSize="large" htmlColor="#FFF" />
            ) : (
              <ExpandMore fontSize="large" htmlColor="#FFF" />
            )}
          </IconButton>
        </Stack>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack gap={2}>
          <LessonItem />
          <LessonItem />
        </Stack>
      </Collapse>
    </Stack>
  );
};
