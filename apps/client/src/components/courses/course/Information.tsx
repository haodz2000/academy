import {
  Avatar,
  Box,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { CourseDetailResponse } from '@libs/openapi-generator/generated';
import { useLearningRequestMutation } from '@client/hooks/apis/learning-requests/useLearningRequestMutation';
import { useNotify } from '@client/components/notification/hook';
import { PriceCourse } from '../PriceCourse';
import { useIsLogin } from '@client/hooks/useIsLogin';
import { ModeCourse } from '@libs/constants/entities/Course';
import { Back } from '@client/components/ui/Back';
import Link from 'next/link';

interface Props {
  course: CourseDetailResponse;
}
export const Information = ({ course }: Props) => {
  const isLogin = useIsLogin();
  const { notify, notifyError } = useNotify();
  const learningRequest = useLearningRequestMutation();
  const isPay = course.mode === ModeCourse.PayFee;
  const sendRequest = async () => {
    try {
      if (isLogin) {
        if (!isPay) {
          await learningRequest.mutateAsync({
            learningRequestDto: {
              course_id: course.id,
            },
          });
          notify({ content: 'Gửi yêu cầu thành công, chờ phê duyệt!' });
        } else {
          notify({ content: 'Khoa hoc chu mo ban' });
        }
      } else {
        notifyError({ content: 'Yêu cầu đăng nhập để học' });
      }
    } catch (error) {
      notifyError({ error });
    }
  };
  return (
    <Stack gap={1}>
      <Box>
        <Back />
      </Box>
      <Stack minHeight={400} flexDirection={'row'} gap={2}>
        <Stack width={'70%'} gap={2} justifyContent={'space-between'}>
          <Stack gap={2}>
            <Typography variant="h1" fontSize={33} fontWeight={600}>
              {course.name}
            </Typography>
            <Rating size="small" readOnly value={5} />
            <PriceCourse course={course} />
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
                sx={(theme) => ({
                  bgcolor: '#328AF11A',
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                })}
                startIcon={<PlayCircleOutlineIcon />}
                onClick={sendRequest}
              >
                Tham gia khóa học
              </RoundedButton>
              <IconButton
                sx={(theme) => ({
                  bgcolor: '#328AF11A',
                  [theme.breakpoints.up('sm')]: {
                    display: 'none',
                  },
                })}
                onClick={sendRequest}
              >
                <PlayCircleOutlineIcon htmlColor="#FFF" />
              </IconButton>
              <IconButton
                sx={(theme) => ({
                  bgcolor: '#328AF11A',
                  [theme.breakpoints.up('sm')]: {
                    display: 'none',
                  },
                })}
                onClick={sendRequest}
              >
                <BookmarkBorderIcon htmlColor="#FFF" />
              </IconButton>
              <RoundedButton
                size="large"
                sx={(theme) => ({
                  bgcolor: '#328AF11A',
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                })}
                startIcon={<BookmarkBorderIcon />}
              >
                Thêm vào danh sách yêu thích
              </RoundedButton>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          justifyContent={'flex-start'}
          width={'30%'}
          sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
              display: 'none',
            },
          })}
        >
          <Avatar src={course.cover?.path} sx={{ height: 216, width: 216 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
