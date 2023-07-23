import { Avatar, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ForwardIcon from '@mui/icons-material/Forward';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { CourseDetailResponse } from '@libs/openapi-generator/generated';
import Link from '../ui/Link';
import { useAppSelector } from '@client/stores';
import { RatingCourse } from '../courses/RatingCourse';

interface Props {
  course: CourseDetailResponse;
}
export const CourseLearining = ({ course }: Props) => {
  const currentUser = useAppSelector((state) => state.user.user);
  const videos = course.sections.reduce((total, current) => {
    return total + current.lessons.length;
  }, 0);
  return (
    <Stack
      py={2}
      px={4}
      component={Paper}
      bgcolor="#18273f"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Avatar src={course.cover.path} sx={{ height: 60, width: 60 }} />
        <Stack gap={1}>
          <Typography fontWeight={700}>{course.name}</Typography>
          <Stack position="relative" flexDirection="row" alignItems="center">
            <Stack flexDirection="row" alignItems="center">
              {course.topics.map((topic, index) => (
                <Chip
                  sx={{ bgcolor: '#323744' }}
                  label={topic.name}
                  key={index}
                />
              ))}
            </Stack>
            <Divider
              sx={{ bgcolor: '#FFF', height: 18, mx: 1 }}
              orientation="vertical"
            />
            <Stack flexDirection="row" alignItems="center">
              <Typography variant="caption">Published:</Typography>
              <Typography variant="caption">
                {new Date(course.updated_at).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack flexDirection="row" alignItems={'center'} gap={1}>
        <Stack flexDirection="row" alignItems={'center'} gap={4} mr={2}>
          <Stack flexDirection="row" alignItems={'center'}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="caption">{videos} videos</Typography>
          </Stack>
          <Stack flexDirection="row" alignItems={'center'}>
            <AutoStoriesIcon fontSize="small" />
            <Typography variant="caption">
              {course.sections.length} Chương
            </Typography>
          </Stack>
        </Stack>
        <Avatar src={currentUser?.avatar.path} />
        <RoundedButton
          component={Link}
          href={'/series/' + course.slug + '/lessons/'}
          startIcon={<ForwardIcon />}
          sx={{ bgcolor: '#6a7ea3' }}
        >
          Học tiếp
        </RoundedButton>
        <RatingCourse course={course} />
      </Stack>
    </Stack>
  );
};
