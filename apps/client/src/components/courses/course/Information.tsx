import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { CourseDetailResponse } from '@libs/openapi-generator/generated';

interface Props {
  course: CourseDetailResponse;
}
export const Information = ({ course }: Props) => {
  return (
    <Stack gap={1}>
      <Box>
        <RoundedButton
          sx={{ bgcolor: '#328AF11A' }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </RoundedButton>
      </Box>
      <Stack minHeight={400} flexDirection={'row'} gap={2}>
        <Stack width={'70%'} gap={2} justifyContent={'space-between'}>
          <Stack gap={2}>
            <Typography variant="h1" fontSize={33} fontWeight={600}>
              {course.name}
            </Typography>
            <Stack flexDirection={'row'} gap={1}>
              {course.topics?.map((topic) => (
                <RoundedButton
                  key={topic.id}
                  sx={{
                    bgcolor: '#328AF11A',
                    ':hover': { bgcolor: '#328AF11A' },
                  }}
                >
                  {topic.name}
                </RoundedButton>
              ))}
            </Stack>
            <Stack>
              <Typography>{course.description}</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row" gap={3}>
            <RoundedButton
              size="large"
              sx={{ bgcolor: '#328AF11A' }}
              startIcon={<PlayCircleOutlineIcon />}
            >
              Start Series
            </RoundedButton>
            <RoundedButton
              size="large"
              sx={{ bgcolor: '#328AF11A' }}
              startIcon={<BookmarkBorderIcon />}
            >
              Add to Watchlist
            </RoundedButton>
          </Stack>
        </Stack>
        <Stack justifyContent={'flex-start'} width={'30%'}>
          <Avatar src={course.cover?.path} sx={{ height: 216, width: 216 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
