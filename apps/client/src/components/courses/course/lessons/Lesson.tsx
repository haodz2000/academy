import Link from '@client/components/ui/Link';
import { getTimeVideo } from '@client/utils/lesson';
import { LessonResponse } from '@libs/openapi-generator/generated';
import { Avatar, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  lesson: LessonResponse;
  currentId: number;
}
export const Lesson = ({ lesson, currentId }: Props) => {
  const router = useRouter();
  const slug = router.query.slug as string;
  return (
    <Stack
      component={Link}
      underline="none"
      color={'inherit'}
      href={'/series/' + slug + '/lessons/' + lesson.id}
      borderRadius={2}
      padding={1}
      bgcolor={lesson.id == currentId ? '#253D63' : '#328AF112'}
      sx={{
        ':hover': {
          bgcolor: '#253D63',
        },
      }}
      flexDirection={'row'}
      gap={1}
      position="relative"
    >
      {/* <Stack position="absolute" top={"50%"} right={15} sx={{transform: 'translateY(-50%)'}}>
        <CheckCircleIcon color='success'/>
      </Stack> */}
      <Stack
        flexDirection={'row'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Avatar sx={{ height: 32, width: 32, bgcolor: '#328af11A' }}>01</Avatar>
        <Stack gap={1}>
          <Typography variant="h1" fontSize={14} fontWeight={600}>
            {lesson?.title}
          </Typography>
          <Typography variant="body1" fontSize={9} fontWeight={600}>
            {getTimeVideo(lesson?.time)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
