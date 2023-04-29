import { AppLayout } from '@client/components/layouts/AppLayout';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

const Index = () => {
  const router = useRouter();
  console.log(router);
  return <div>setting</div>;
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
