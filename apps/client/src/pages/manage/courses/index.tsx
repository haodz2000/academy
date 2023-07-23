import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { Course } from '@client/components/manage/courses/Course';
import { Empty } from '@client/components/ui/Empty';
import { RoundedButton } from '@client/components/ui/buttons';
import { withAuth } from '@client/hocs/withAuth';
import { useCoursesManageQuery } from '@client/hooks/apis/courses/useCoursesManageQuery';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';

const Index = () => {
  const router = useRouter();
  const coursesQuery = useCoursesManageQuery({
    page: 1,
    status: 2,
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
    <Stack width={'100%'} paddingX={2} flexDirection={'row'} gap={2}>
      <Stack width={'30%'}>
        <Stack width={220}>
          <NavbarManage>
            <RoundedButton
              onClick={() => router.push('/manage/courses/create')}
            >
              Tạo khóa học
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
            {!courses.length && <Empty content="Không có khóa học nào" />}
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
