import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { LearningRequestDetail } from '@client/components/learning-requests/LearningRequestDetail';
import { withAuth } from '@client/hocs/withAuth';
import { useLearningRequestQuery } from '@client/hooks/apis/learning-requests/useLearningRequestQuery';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';

const Index = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const learningRequestQuery = useLearningRequestQuery({ id });
  const request = useMemo(() => {
    return learningRequestQuery.data?.data;
  }, [learningRequestQuery.data?.data]);
  const refresh = () => {
    learningRequestQuery.refetch();
  };
  if (learningRequestQuery.isLoading) {
    return <LoadingPage />;
  }
  if (learningRequestQuery.isError) {
    return <ErrorPage />;
  }
  if (request) {
    return <LearningRequestDetail refresh={refresh} request={request} />;
  } else {
    return <ErrorPage />;
  }
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
