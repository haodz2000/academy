import Link from '@client/components/ui/Link';
import { TopicStatResponse } from '@libs/openapi-generator/generated';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  topic: TopicStatResponse;
}
export const TopicItem = ({ topic }: Props) => {
  return (
    <Paper
      sx={{
        width: '190px',
        height: '80px',
        bgcolor: '#18273F',
        ':hover': {
          bgcolor: '#203453',
        },
      }}
      elevation={0}
    >
      <Stack
        height={1}
        component={Link}
        underline="none"
        color="inherit"
        href={'/topics/' + topic.slug}
        gap={2}
        padding={1}
        flexDirection={'row'}
        alignItems="center"
      >
        <Avatar src={topic.cover.path} />
        <Stack>
          <Typography variant="subtitle1" fontSize={15} fontWeight={600}>
            {topic.name}
          </Typography>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography
              variant="body2"
              fontSize={9}
              fontWeight={600}
              color="#bad9fc7f"
            >
              {topic.totalCourses} courses
            </Typography>
            <Typography>&diams;</Typography>
            <Typography
              variant="body2"
              fontSize={9}
              fontWeight={600}
              color="#bad9fc7f"
            >
              {topic.totalVideos} videos
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
