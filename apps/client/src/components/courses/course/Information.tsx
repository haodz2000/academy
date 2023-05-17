import { Avatar, Box, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { CourseDetailResponse } from '@libs/openapi-generator/generated';
import { useLearningRequestMutation } from '@client/hooks/apis/learning-requests/useLearningRequestMutation';
import { useNotify } from '@client/components/notification/hook';
import Link from '@client/components/ui/Link';

interface Props {
  course: CourseDetailResponse;
}
export const Information = ({ course }: Props) => {
  const { notify, notifyError } = useNotify();
  const learningRequest = useLearningRequestMutation();
  const sendRequest = async () => {
    try {
      await learningRequest.mutateAsync({
        learningRequestDto: {
          course_id: course.id,
        },
      });
      notify({ content: 'Gửi yêu cầu thành công, chờ phê duyệt!' });
    } catch (error) {
      notifyError({ error });
    }
  };
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
            <Rating size="small" name="simple-controlled" value={5} />
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
          <Stack gap={3}>
            <Stack gap={1}>
              <Typography variant="h6" fontSize={18} fontWeight={500}>
                Học viên tham gia
              </Typography>
              <Stack flexDirection="row">
                {course.students?.map((student, index) => (
                  <Avatar
                    component={Link}
                    href={'/profile/' + student.email.split('@')[0]}
                    sx={{ mr: -1 }}
                    src={student.avatar.path}
                    key={index}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack flexDirection="row" gap={3}>
              <RoundedButton
                size="large"
                sx={{ bgcolor: '#328AF11A' }}
                startIcon={<PlayCircleOutlineIcon />}
                onClick={sendRequest}
              >
                Tham gia khóa học
              </RoundedButton>
              <RoundedButton
                size="large"
                sx={{ bgcolor: '#328AF11A' }}
                startIcon={<BookmarkBorderIcon />}
              >
                Thêm vào danh sách yêu thích
              </RoundedButton>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent={'flex-start'} width={'30%'}>
          <Avatar src={course.cover?.path} sx={{ height: 216, width: 216 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
