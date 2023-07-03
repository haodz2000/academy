import { AppLayout } from '@client/components/layouts/AppLayout';
import { Topics } from '@client/components/topics';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { ReactElement, useMemo } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import { RoundedButton } from '@client/components/ui/buttons';
import { Information } from '@client/components/courses/course/Information';
import { Content } from '@client/components/courses/course/Content';
import { useRouter } from 'next/router';
import { useCourseQuery } from '@client/hooks/apis/courses/useCourseQuery';
import Link from '@client/components/ui/Link';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { getProfile } from '@client/utils/user';

export const Index = () => {
  const router = useRouter();
  const slug = (router.query.slug as string) || '';
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
  return (
    <Stack position={'relative'} gap={8}>
      <Stack width={'100%'} flexDirection={'row'} padding={2} gap={12}>
        <Grid container>
          <Grid item md={3}>
            <Stack paddingX={2} gap={2}>
              <Stack width={315} height={445} position={'relative'}>
                {course.administrator && (
                  <Image
                    loader={({ src }) => src}
                    alt={course.administrator?.name}
                    src={course.administrator?.avatar.path}
                    fill
                    style={{ borderRadius: '20px' }}
                    unoptimized
                  />
                )}
              </Stack>
              <Stack width={'90%'} margin={'0 auto'}>
                <Stack
                  margin={'0 auto'}
                  width={'100%'}
                  flexDirection={'row'}
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    fontWeight={600}
                    variant="body2"
                    fontSize={12}
                    color="#78909C"
                  >
                    {course.administrator?.job || 'Developer'}
                  </Typography>
                  <Stack
                    width={'100%'}
                    height={'2px'}
                    bgcolor={'#78909C'}
                  ></Stack>
                </Stack>
                <Stack alignItems={'flex-start'} width={'100%'} gap={1}>
                  <Typography variant="h1" fontWeight={600} fontSize={25}>
                    {course.administrator?.name}
                  </Typography>
                  <Stack flexDirection={'row'}>
                    <IconButton>
                      <FacebookIcon fontSize="large" color="primary" />
                    </IconButton>
                  </Stack>
                  <Typography variant="subtitle2" color={''}>
                    <Link
                      underline="none"
                      href={'mailto:' + course.administrator?.email}
                    >
                      {course.administrator?.email}
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <RoundedButton
                  component={Link}
                  href={'/users/' + getProfile(course.administrator?.email)}
                  sx={{ bgcolor: '#328AF11A' }}
                >
                  Watch Profile
                </RoundedButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={9} paddingX={10}>
            {!!course && (
              <Stack gap={5}>
                <Information course={course} />
                <Content course={course} />
              </Stack>
            )}
          </Grid>
        </Grid>
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

export default Index;
