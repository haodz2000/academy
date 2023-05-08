import { CourseItem } from '@client/components/courses/CourseItem';
import { Topics } from '@client/components/home/topics';
import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { Empty } from '@client/components/ui/Empty';
import { withUnAuth } from '@client/hocs/withUnAuth';
import { useTopicQuery } from '@client/hooks/apis/topics/useTopicQuery';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';

const Index = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const topicQuery = useTopicQuery({ slug: slug });
  const topic = useMemo(() => {
    return topicQuery.data?.data ?? null;
  }, [topicQuery.data?.data]);
  if (topicQuery.isLoading) {
    return <LoadingPage />;
  }
  if (topicQuery.isError) {
    return <ErrorPage />;
  }
  return (
    <Stack gap={3}>
      <Topics />
      <Stack gap={6}>
        <Stack margin={'0 auto'} flexDirection={'row'} gap={1}>
          <Typography fontSize={33}>Exploring</Typography>
          <Typography fontSize={33} color={'blue'}>
            {'//' + topic.name}
          </Typography>
        </Stack>
        <Stack gap={4}>
          {!!topic &&
            topic.courses.map((course) => (
              <CourseItem course={course} key={course.id} />
            ))}
          {!topic.courses.length && <Empty content="No course" />}
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

export const getServerSideProps = withUnAuth();

export default Index;
