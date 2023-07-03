import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { TeachingRequestDetail } from '@client/components/teaching-requests/TeachingRequestDetail';
import { withAuth } from '@client/hocs/withAuth';
import { useTeachingRequestQuery } from '@client/hooks/apis/teaching-requests/useTeachingRequestQuery';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

const Index = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const teachingRequestQuery = useTeachingRequestQuery({ id });
  const request = teachingRequestQuery.data?.data;
  const refresh = () => {
    teachingRequestQuery.refetch();
  };
  if (teachingRequestQuery.isLoading) {
    return <LoadingPage />;
  }
  if (teachingRequestQuery.isError) {
    return <ErrorPage />;
  }
  return <TeachingRequestDetail refresh={refresh} request={request} />;
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
