import {
  Avatar,
  Collapse,
  IconButton,
  Pagination,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  CourseDetailResponse,
  RatingResponse,
} from '@libs/openapi-generator/generated';
import { useRatingCoursesQuery } from '@client/hooks/apis/courses/useRatingCoursesQuery';

interface Props {
  course: CourseDetailResponse;
}
export const ListRating = ({ course }: Props) => {
  const [open, setOpen] = React.useState(true);
  const [page, setPage] = useState<number>(1);
  const ratingsQuery = useRatingCoursesQuery({
    courseId: course.id,
    limit: 15,
    page: page,
  });
  const ratings = useMemo(() => {
    return ratingsQuery.data?.data ?? [];
  }, [ratingsQuery.data?.data]);
  console.log(ratings);
  const total = ratingsQuery.data?.pagination?.total || 0;
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Stack bgcolor={'#18273F'} borderRadius={5} paddingX={2} width={'100%'}>
      <Stack
        flexDirection={'row'}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Stack gap={2} height={1} flexDirection={'row'} alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Đánh giá từ học viên
          </Typography>
        </Stack>
        <Stack>
          <IconButton onClick={handleClick}>
            {open ? (
              <ExpandLess fontSize="large" htmlColor="#FFF" />
            ) : (
              <ExpandMore fontSize="large" htmlColor="#FFF" />
            )}
          </IconButton>
        </Stack>
      </Stack>
      <Collapse in={open}>
        <Stack paddingBottom={2} gap={1}>
          {ratings.map((rating: RatingResponse, index) => (
            <Stack key={index} flexDirection="row" gap={2}>
              <Avatar src={rating.user.avatar.path}></Avatar>
              <Stack gap={1}>
                <Stack flexDirection="row" gap={1}>
                  <Typography>{rating.user.name}</Typography>
                  <Rating value={rating.point} readOnly />
                </Stack>
                <Typography fontSize={12}>{rating.comment}</Typography>
              </Stack>
            </Stack>
          ))}
          <Stack alignItems={'flex-end'} justifyContent={'flex-end'}>
            <Pagination
              onChange={(e, v) => setPage(v)}
              count={Math.ceil(total / 15)}
            />
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};
