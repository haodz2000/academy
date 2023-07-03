import { Avatar, Divider, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Section } from './Section';
import {
  CourseDetailResponse,
  LessonResponse,
} from '@libs/openapi-generator/generated';
import { Back } from '@client/components/ui/Back';
import { getTimeVideo } from '@client/utils/lesson';

interface Props {
  course: CourseDetailResponse;
  lesson: LessonResponse;
}
export const Navbar = ({ course, lesson }: Props) => {
  const lessons = useMemo(() => {
    const sections = course.sections;
    return sections
      .map((i) => {
        return i.lessons;
      })
      .flat();
  }, [course]);
  const totalTime = useMemo(() => {
    return lessons.reduce(
      (total, currentValue) => total + currentValue.time,
      0
    );
  }, [lessons]);
  return (
    <Stack
      width={330}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor="#0D131D"
      zIndex={999}
      padding={1}
      gap={1}
      height={1}
    >
      <Stack flexDirection="row" alignItems="center" height={60}>
        <Back />
      </Stack>
      <Stack gap={2}>
        <Stack height={60} flexDirection="row" alignItems="center" gap={2}>
          <Avatar sx={{ height: 59, width: 59 }} />
          <Stack gap={1}>
            <Typography variant="h3" fontSize={18} fontWeight={600}>
              {course.name}
            </Typography>
            <Stack height={15} flexDirection="row" alignItems="center" gap={2}>
              <Stack gap={1} flexDirection="row" alignItems="center">
                <AutoStoriesIcon fontSize="small" />
                <Typography fontSize={12}>
                  {course.sections?.length} lessons
                </Typography>
              </Stack>
              <Divider color="#FFF" orientation="vertical" />
              <Stack gap={1} flexDirection="row" alignItems="center">
                <AccessTimeIcon fontSize="small" />
                <Typography fontSize={12}>
                  {getTimeVideo(totalTime || 0)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          paddingRight={1}
          gap={2}
          sx={{
            overflowY: 'scroll',
            height: 'calc(100vh - 120px)',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              width: '0em',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#203453',
              borderRadius: '50px',
            },
          }}
        >
          {course.sections?.map((section, index) => (
            <Section
              lessonCurrent={lesson}
              order={index + 1}
              section={section}
              key={section.id}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
