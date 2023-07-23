import { Can } from '@client/abilities';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { FormCreateSection } from '@client/components/manage/courses/FormCreateSection';
import { HeaderInformation } from '@client/components/manage/courses/HeaderInformation';
import { Section } from '@client/components/manage/courses/Section';
import { RoundedButton } from '@client/components/ui/buttons';
import { withAuth } from '@client/hocs/withAuth';
import { useCourseQuery } from '@client/hooks/apis/courses/useCourseQuery';
import { IdAction } from '@libs/constants/abilities';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';

const Index = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const courseQuery = useCourseQuery({ slug: slug });
  const course = useMemo(() => {
    return courseQuery.data?.data ?? null;
  }, [courseQuery.data?.data]);
  if (courseQuery.isLoading) {
    return <LoadingPage />;
  }
  if (courseQuery.isError) {
    return <ErrorPage />;
  }
  const onRefresh = () => {
    courseQuery.refetch();
  };
  return (
    <Stack width={'100%'} paddingX={2} flexDirection={'row'} gap={2}>
      <Stack width={'30%'}>
        <Stack width={220}>
          <NavbarManage>
            <RoundedButton onClick={() => router.back()}>
              Quay lai
            </RoundedButton>
          </NavbarManage>
        </Stack>
      </Stack>
      <Stack width={'70%'}>
        <Stack paddingX={2} gap={1}>
          <HeaderInformation course={course} />
          <Can I={IdAction.Update} this={course}>
            <FormCreateSection onCreated={onRefresh} course={course} />
          </Can>
          <Stack gap={2}>
            <Typography variant="h6" fontWeight={600}>
              Lộ trình học
            </Typography>
            <Stack gap={1}>
              {course.sections?.map((section) => (
                <Section
                  course={course}
                  onCreated={onRefresh}
                  section={section}
                  key={section.id}
                />
              ))}
            </Stack>
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
