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
import {
  CourseDetailResponse,
  SectionFullResponse,
} from '@libs/openapi-generator/generated';
import { FormUpdateSection } from './FormUpdateSection';
import { Can } from '@client/abilities';
import { IdAction } from '@libs/constants/abilities';

interface Props {
  section: SectionFullResponse;
  onCreated: () => void;
  course: CourseDetailResponse;
}
export const Section = ({ section, onCreated, course }: Props) => {
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
            Chương {section.order}
          </Typography>
          <Divider color="#9b9b9b" orientation="vertical" />
          <Typography variant="subtitle1" fontWeight={600}>
            {section.title}
          </Typography>
        </Stack>
        <Stack flexDirection={'row'} alignItems={'center'}>
          <Can I={IdAction.Update} this={course}>
            <FormUpdateSection section={section} onCreated={onCreated} />
            <Tooltip title={'Tạo bài giảng'}>
              <IconButton onClick={() => setOpenForm(!openForm)}>
                <AddIcon fontSize="large" htmlColor="#FFF" />
              </IconButton>
            </Tooltip>
          </Can>
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
        <FormCreateLesson onCreated={onCreated} section={section} />
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack gap={2}>
          {section.lessons?.map((lesson) => (
            <Lesson
              course={course}
              lesson={lesson}
              key={lesson.id}
              onCreated={onCreated}
            />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
