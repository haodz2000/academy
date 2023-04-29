import {
  Collapse,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { Lesson } from './Lesson';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { FormCreateLesson } from './FormCreateLesson';
import { SectionFullResponse } from '@libs/openapi-generator/generated';

interface Props {
  section: SectionFullResponse;
}
export const Section = ({ section }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);

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
            Section {section.id}
          </Typography>
          <Divider color="#9b9b9b" orientation="vertical" />
          <Typography variant="subtitle1" fontWeight={600}>
            {section.title}
          </Typography>
        </Stack>
        <Stack flexDirection={'row'}>
          <Tooltip title={'New Lesson'}>
            <IconButton onClick={() => setOpenForm(!openForm)}>
              <AddIcon fontSize="large" htmlColor="#FFF" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleClick}>
            {open ? (
              <ExpandLess fontSize="large" htmlColor="#FFF" />
            ) : (
              <ExpandMore fontSize="large" htmlColor="#FFF" />
            )}
          </IconButton>
        </Stack>
      </Stack>
      <Collapse in={openForm} timeout="auto" unmountOnExit>
        <FormCreateLesson section={section} />
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack gap={2}>
          {section.lessons?.map((lesson) => (
            <Lesson lesson={lesson} key={lesson.id} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
