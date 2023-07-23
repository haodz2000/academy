import { Avatar, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { CourseResponse } from '@libs/openapi-generator/generated';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

interface Props {
  course: CourseResponse;
}
export const Course = ({ course }: Props) => {
  return (
    <Paper
      sx={{
        padding: 2,
        bgcolor: '#18273F',
        borderRadius: 3,
        ':hover': {
          bgcolor: 'rgb(25 48 78)',
        },
      }}
    >
      <Stack gap={2}>
        <Stack flexDirection="row" gap={2} justifyContent="flex-start">
          <Stack gap={1}>
            <Avatar src={course.cover.path}></Avatar>
            <IconButton
              href={'/manage/courses/' + course.slug + '/setting'}
              LinkComponent={Link}
            >
              <EditIcon htmlColor="#FFF" />
            </IconButton>
          </Stack>
          <Stack width={'100%'} gap={1}>
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent="space-between"
            >
              <Typography
                variant="h3"
                fontSize={20}
                color="#FFFFFFE8"
                fontWeight={600}
                component={Link}
                href={'/manage/courses/' + course.slug}
              >
                {course.name}
              </Typography>
              <Stack flexDirection="row">
                <IconButton
                  LinkComponent={Link}
                  href={`/manage/courses/${course.slug}`}
                >
                  <AddIcon fontSize="large" sx={{ color: '#FFF' }} />
                </IconButton>
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Typography color={'#D8E3EE'} variant="subtitle1">
                {course.description}
              </Typography>
              <Stack flexDirection="row" gap={1} alignItems="center">
                <Typography
                  fontSize={10}
                  variant="body2"
                  fontWeight={600}
                  color="#328AF1"
                  component={Link}
                  href={
                    course.creator
                      ? 'profile/' + course.creator.email.split('@')[0]
                      : '#'
                  }
                >
                  {course.creator ? course.creator.name : ''}
                </Typography>
                <Typography fontSize={10} color={'#D8E3EE'} variant="body2">
                  cập nhật lúc {new Date().toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
