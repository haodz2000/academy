import { AppLayout } from '@client/components/layouts/AppLayout';
import { withAuth } from '@client/hocs/withAuth';
import { Collapse, IconButton, Stack, Typography } from '@mui/material';
import React, { ReactElement, useMemo, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CourseLearining } from '@client/components/my-learning-path/CourseLearining';
import { useCourseLearningsQuery } from '@client/hooks/apis/courses/useCourseLearningsQuery';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';

const Index = () => {
  const [open, setOpen] = useState(false);
  const courseLearningsQuery = useCourseLearningsQuery();
  const courses = useMemo(() => {
    return courseLearningsQuery.data?.data ?? [];
  }, [courseLearningsQuery.data?.data]);
  if (courseLearningsQuery.isLoading) {
    return <LoadingPage />;
  }
  if (courseLearningsQuery.isError) {
    return <ErrorPage />;
  }
  return (
    <Stack gap={2}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack gap={1} flexDirection="row" alignItems="center">
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ bgcolor: '#ffffff11' }}
          >
            {open ? (
              <ExpandMoreIcon htmlColor="#FFF" />
            ) : (
              <ExpandLessIcon htmlColor="#FFF" />
            )}
          </IconButton>
          <Typography variant="h6" fontWeight={700}>
            Danh sách khóa học tham gia
          </Typography>
        </Stack>
      </Stack>
      <Collapse in={!open}>
        <Stack gap={1}>
          {courses.map((course, index) => (
            <CourseLearining course={course} key={index} />
          ))}
        </Stack>
      </Collapse>
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
