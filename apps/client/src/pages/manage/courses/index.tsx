import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { Course } from '@client/components/manage/courses/Course';
import Link from '@client/components/ui/Link';
import { RoundedButton } from '@client/components/ui/buttons';
import { withAuth } from '@client/hocs/withAuth';
import { useCoursesQuery } from '@client/hooks/apis/courses/useCoursesQuery';
import { TypeQueryCourse } from '@libs/constants/entities/Course';
import { Stack, Typography } from '@mui/material';
import React, { ReactElement, useMemo } from 'react';

const Index = () => {
  const coursesQuery = useCoursesQuery({
    page: 1,
    status: 1,
    type: TypeQueryCourse.Manage,
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
    <Stack width={'100%'} paddingX={2} flexDirection={'row'} gap={2}>
      <Stack width={'30%'}>
        <Stack width={220}>
          <NavbarManage>
            <RoundedButton href="/manage/courses/create" component={Link}>
              New course
            </RoundedButton>
          </NavbarManage>
        </Stack>
      </Stack>
      <Stack width={'70%'}>
        <Stack paddingX={2} gap={2}>
          <Stack gap={2}>
            {courses.map((course) => (
              <Course course={course} key={course.id} />
            ))}
          </Stack>
        </Stack>
      </Stack>
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

export const getServerSideProps = withAuth();
export default Index;
