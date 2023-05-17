import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/manage/courses');
  });
  return <div>index</div>;
};

export default Index;
