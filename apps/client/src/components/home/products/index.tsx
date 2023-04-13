import { Stack, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { ProductItem } from './ProductItem';

export const Products = () => {
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
          Produced By Creators.
        </Typography>
        <Typography variant="subtitle1" fontSize={15} textAlign="center">
          {`Don't miss out on our special CreatorSeries courses. Want to learn the
          ins and outs of tools...from the very people who created them?`}
        </Typography>
        <Stack position={'absolute'} top={-25} right={0} zIndex={0}>
          <Stack position={'relative'} width={550} height={306}>
            <Image
              loader={({ src }) => src}
              alt=""
              src="https://laracasts.com/images/sale/2022/large-prism.svg"
              fill
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
        {Array.from(Array(3)).map((_, index) => (
          <ProductItem key={index} />
        ))}
      </Stack>
    </Stack>
  );
};
