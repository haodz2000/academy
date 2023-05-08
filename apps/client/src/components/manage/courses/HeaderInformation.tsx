import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CourseDetailResponse } from '@libs/openapi-generator/generated';
import Link from '@client/components/ui/Link';
import { Back } from '@client/components/ui/Back';
import { StatusCourse } from '@libs/constants/entities/Course';

interface Props {
  course: CourseDetailResponse;
}
export const HeaderInformation = ({ course }: Props) => {
  return (
    <Stack gap={1}>
      <Back />
      <Stack flexDirection={'row'} gap={2}>
        <Stack width={'70%'} gap={2} justifyContent={'space-between'}>
          <Stack gap={2}>
            <Typography variant="h1" fontSize={33} fontWeight={600}>
              {course.name}
            </Typography>
            <Stack flexDirection={'row'} gap={1}>
              {course.topics?.map((topic) => (
                <RoundedButton key={topic.id} sx={{ bgcolor: '#328AF11A' }}>
                  {topic.name}
                </RoundedButton>
              ))}
            </Stack>
            <Stack>
              <Typography>{course.description}</Typography>
            </Stack>
            <Stack flexDirection={'row'} gap={1}>
              <Typography>Administrator:</Typography>
              <Typography
                fontWeight={600}
                underline="hover"
                component={Link}
                href={'/profile/' + course.administrator.email.split('@')[0]}
              >
                {course.administrator.name}
              </Typography>
            </Stack>
            <Stack>
              <RoundedButton sx={{ background: '#328AF11A' }}>
                {course.status == StatusCourse.Pending && 'Đăng kí dạy học'}
              </RoundedButton>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent={'flex-start'} width={'30%'}>
          <Avatar src={course.cover.path} sx={{ height: 216, width: 216 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
