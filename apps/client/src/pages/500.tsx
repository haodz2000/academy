import { ErrorLayout } from '@client/components/layouts/ErrorLayout';
import { ReactElement } from 'react';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';

const Error500 = () => {
  return <ErrorPage />;
};

export default Error500;

Error500.getLayout = function getLayout(page: ReactElement) {
  return <ErrorLayout>{page}</ErrorLayout>;
};
