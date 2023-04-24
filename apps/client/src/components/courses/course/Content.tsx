import { Divider, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { SectionItem } from '@client/components/courses/SectionItem';
import { CourseDetailResponse } from '@libs/openapi-generator/generated';

interface Props {
  course: CourseDetailResponse;
}
export const Content = ({ course }: Props) => {
  return (
    <Stack gap={3}>
      <Stack
        flexDirection={'row'}
        alignItems="center"
        width={'100%'}
        justifyContent={'space-between'}
        bgcolor="#253D63"
        height={65}
        borderRadius={5}
        padding={2}
      >
        <Stack
          width="100%"
          flexDirection={'row'}
          gap={2}
          alignItems="center"
          height={1}
        >
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
            <AutoStoriesIcon />
            <Typography>{course.sections?.length || 0} sections</Typography>
          </Stack>
          <Divider color="#9b9b9b" orientation="vertical" />
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
            <AccessTimeIcon />
            <Typography>1h 43m</Typography>
          </Stack>
        </Stack>
        <Stack flexDirection={'row'}>
          <IconButton>
            <FacebookIcon sx={{ color: '#FFF' }} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack gap={2}>
        {course.sections?.map((section, index) => (
          <SectionItem order={index} key={section.id} section={section} />
        ))}
      </Stack>
    </Stack>
  );
};
