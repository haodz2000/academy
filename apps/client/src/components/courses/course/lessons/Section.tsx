import {
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Lesson } from './Lesson';
import {
  LessonResponse,
  SectionFullResponse,
} from '@libs/openapi-generator/generated';

interface Props {
  section: SectionFullResponse;
  order: number;
  lessonCurrent: LessonResponse;
}
export const Section = ({ section, order, lessonCurrent }: Props) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (section && lessonCurrent) {
      const lessonIds = section.lessons.map((i) => i.id);
      if (lessonIds.includes(lessonCurrent.id)) {
        setOpen(true);
      }
    }
  }, [section, lessonCurrent]);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Stack gap={1}>
      <Stack
        flexDirection={'row'}
        alignItems="center"
        justifyContent={'space-between'}
        bgcolor={'#328AF112'}
        height={45}
        borderRadius={2}
        padding={2}
        width={'100%'}
      >
        <Stack gap={2} height={1} flexDirection={'row'} alignItems="center">
          <Typography variant="subtitle2" fontWeight={500}>
            Section {order}
          </Typography>
          <Divider color="#9b9b9b" orientation="vertical" />
          <Typography variant="subtitle2" fontWeight={500}>
            {section.title}
          </Typography>
        </Stack>
        <Stack>
          <IconButton onClick={handleClick}>
            {open ? (
              <ExpandLess htmlColor="#FFF" />
            ) : (
              <ExpandMore htmlColor="#FFF" />
            )}
          </IconButton>
        </Stack>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack gap={0.5}>
          {section.lessons?.map((lesson, index) => (
            <Lesson currentId={lessonCurrent.id} key={index} lesson={lesson} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
