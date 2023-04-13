import { Stack, StackProps, Typography } from '@mui/material';
import Link from '@client/components/ui/Link';
import { FC } from 'react';

interface Props extends StackProps {
  title?: string;
  description?: string;
}

export const ErrorPage: FC<Props> = ({ title, description, ...props }) => {
  return (
    <Stack
      width={1}
      height={1}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={5}
        maxWidth={1}
        width="500px"
        p={3}
      >
        <Stack alignItems="center">
          <Typography fontSize={48} fontWeight={800} textAlign="center">
            {title ?? 'Có gì đó sai sai!'}
          </Typography>
          <Typography color="rgb(107, 114, 128)" textAlign="center">
            {description ??
              'Không tìm thấy dịch vụ hoặc tham số không chính xác :<'}
          </Typography>
        </Stack>
        <Link href="/">Quay trở về trang chủ</Link>
      </Stack>
    </Stack>
  );
};
