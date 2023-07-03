import { CourseItem } from '@client/components/courses/CourseItem';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { Topics } from '@client/components/topics';
import { withUnAuth } from '@client/hocs/withUnAuth';
import { useCoursesQuery } from '@client/hooks/apis/courses/useCoursesQuery';
import { StatusCourse, TypeQueryCourse } from '@libs/constants/entities/Course';
import { Stack, Typography } from '@mui/material';
import React, { ReactElement, useMemo } from 'react';

export const Index = () => {
  const coursesQuery = useCoursesQuery({
    page: 1,
    status: StatusCourse.Approved,
    type: TypeQueryCourse.Show,
    limit: 10,
  });
  const courses = useMemo(() => {
    return coursesQuery.data?.data ?? [];
  }, [coursesQuery.data?.data]);
  if (coursesQuery.isLoading) {
    return <LoadingPage />;
  }
  if (coursesQuery.isError) {
    return <ErrorPage />;
  }

  return (
    <Stack gap={8}>
      <Stack padding={2} gap={12}>
        <Stack gap={4}>
          <Stack
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems="center"
          >
            <Typography variant="h1" fontWeight={'700'} fontSize={35}>
              Khóa học mới lên
            </Typography>
            <Typography variant="subtitle1">
              {'Các khóa học mới ra mắt'}
            </Typography>
          </Stack>
          <Stack gap={4}>
            {courses.map((course) => (
              <CourseItem course={course} key={course.id} />
            ))}
          </Stack>
        </Stack>
        <Stack gap={4}>
          <Stack
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems="center"
          >
            <Typography variant="h1" fontWeight={'700'} fontSize={35}>
              Yêu thích
            </Typography>
            <Typography variant="subtitle1">
              {'Khóa học được mọi người yêu thích'}
            </Typography>
          </Stack>
          <Stack gap={4}>
            {courses.map((course) => (
              <CourseItem course={course} key={course.id} />
            ))}
          </Stack>
        </Stack>
        <Stack gap={4}>
          <Stack
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems="center"
          >
            <Typography variant="h1" fontWeight={'700'} fontSize={35}>
              Hot Trending
            </Typography>
            <Typography variant="subtitle1">
              {'Khóa học thịnh hành đang được quan tâm nhất'}
            </Typography>
          </Stack>
          <Stack gap={4}>
            {courses.map((course) => (
              <CourseItem course={course} key={course.id} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Topics />
    </Stack>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={true} custom={false}>
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = withUnAuth();

export default Index;
