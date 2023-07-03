import { Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { ProductItem } from './ProductItem';
import { useCoursesQuery } from '@client/hooks/apis/courses/useCoursesQuery';
import { StatusCourse, TypeQueryCourse } from '@libs/constants/entities/Course';
import { CourseItem } from '@client/components/courses/CourseItem';

export const Products = () => {
  const coursesQuery = useCoursesQuery({
    status: StatusCourse.Approved,
    limit: 3,
    page: 1,
    type: TypeQueryCourse.Show,
  });
  const courses = useMemo(() => {
    return coursesQuery.data?.data ?? [];
  }, [coursesQuery.data?.data]);
  return (
    <Stack mt={6} gap={12} position={'relative'}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        width={'50%'}
        margin={'0 auto'}
      >
        <Typography
          variant="h1"
          color={'#49dbff'}
          fontWeight={700}
          fontSize={35}
        >
          Một số khóa học đề xuất.
        </Typography>
        <Typography variant="subtitle1" fontSize={15} textAlign="center">
          Đừng bỏ lỡ các khóa học đặc biệt của chúng tôi. Bạn muốn tìm hiểu
          thông tin chi tiết về các công cụ...từ chính những người đã tạo ra
          chúng?
        </Typography>
        <Stack position={'absolute'} top={-25} right={0} zIndex={0}>
          <Stack position={'relative'} width={550} height={306}>
            <Image
              loader={({ src }) => src}
              alt=""
              src="https://laracasts.com/images/sale/2022/large-prism.svg"
              fill
              unoptimized
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        padding={'0px 20px'}
        flexWrap={'wrap'}
        flexDirection={'row'}
        gap={7}
        justifyContent="center"
      >
        {courses.map((course, index) => (
          <CourseItem course={course} key={index} />
        ))}
      </Stack>
    </Stack>
  );
};
