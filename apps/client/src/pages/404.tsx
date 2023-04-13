import { ErrorLayout } from '@client/components/layouts/ErrorLayout';
import Error from 'next/error';
import { ReactElement } from 'react';

const Error404 = () => {
  return <Error statusCode={404} />;
};

export default Error404;

Error404.getLayout = function getLayout(page: ReactElement) {
  return <ErrorLayout>{page}</ErrorLayout>;
};
