import { AppLayout } from '@client/components/layouts/AppLayout';
import { Topics } from '@client/components/topics';
import {
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
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

export const Index = () => {
  const router = useRouter();
  const slug = (router.query.slug as string) || '';
  const courseQuery = useCourseQuery({ slug: slug });
  const course = useMemo(() => {
    return courseQuery.data?.data ?? null;
  }, [courseQuery.data?.data]);
  if (courseQuery.isLoading) {
    return (
      <Stack position="absolute" top={0} right={0} left={0} bottom={0}>
        <CircularProgress />
      </Stack>
    );
  }
  if (courseQuery.isError) {
    return <ErrorPage />;
  }
  return (
    <Stack position={'relative'} gap={8}>
      <Stack width={'100%'} flexDirection={'row'} padding={2} gap={12}>
        <Grid container md={12}>
          <Grid item md={3}>
            <Stack paddingX={2} gap={2}>
              <Stack width={315} height={445} position={'relative'}>
                <Image
                  loader={({ src }) => src}
                  alt={course.administrator?.name}
                  src={course.administrator?.avatar.path}
                  fill
                  style={{ borderRadius: '20px' }}
                  unoptimized
                />
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
                    Developer
                  </Typography>
                  <Stack
                    width={'100%'}
                    height={'2px'}
                    bgcolor={'#78909C'}
                  ></Stack>
                </Stack>
                <Stack alignItems={'flex-start'} width={'100%'} gap={1}>
                  <Typography
                    component={Link}
                    href={'/users/' + course.administrator?.email.split('@')[0]}
                    underline="none"
                    variant="h1"
                    fontWeight={600}
                    fontSize={25}
                  >
                    {course.administrator?.name}
                  </Typography>
                  <Stack flexDirection={'row'}>
                    <IconButton>
                      <FacebookIcon fontSize="large" color="primary" />
                    </IconButton>
                  </Stack>
                  <Typography variant="subtitle2" color={''}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem esse sed corporis, eum quo eligendi eveniet corrupti
                    fuga ullam illum quos perferendis, placeat libero?
                    Inventore, consequuntur. Autem nihil veritatis esse!
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <RoundedButton sx={{ bgcolor: '#328AF11A' }}>
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
