import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { FormCreateSection } from '@client/components/manage/courses/FormCreateSection';
import { HeaderInformation } from '@client/components/manage/courses/HeaderInformation';
import { ListSection } from '@client/components/manage/courses/ListSection';
import { Section } from '@client/components/manage/courses/Section';
import { RoundedButton } from '@client/components/ui/buttons';
import { useCourseQuery } from '@client/hooks/apis/courses/useCourseQuery';
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
    return <Typography>...Loading</Typography>;
  }
  if (courseQuery.isError) {
    return <ErrorPage />;
  }
  return (
    <Stack width={'100%'} paddingX={2} flexDirection={'row'} gap={2}>
      <Stack width={'30%'}>
        <Stack width={220}>
          <NavbarManage>
            <RoundedButton>Quay lai</RoundedButton>
          </NavbarManage>
        </Stack>
      </Stack>
      <Stack width={'70%'}>
        <Stack paddingX={2} gap={1}>
          <HeaderInformation course={course} />
          <FormCreateSection course={course} />
          <Stack gap={2}>
            <Typography variant="h6" fontWeight={600}>
              List Section
            </Typography>
            <Stack gap={1}>
              {course.sections?.map((section) => (
                <Section section={section} key={section.id} />
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

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
export default Index;
