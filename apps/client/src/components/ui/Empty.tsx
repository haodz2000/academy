import Image from 'next/image';
import emptyFolderIcon from '@client/assets/icons/empty-folder.svg';
import { Stack, StackProps, Typography } from '@mui/material';
import { FC } from 'react';

interface Props extends StackProps {
  content?: string;
}

export const Empty: FC<Props> = ({ content, ...props }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width={1}
      height="300px"
      spacing={2}
      {...props}
    >
      <Image src={emptyFolderIcon} width={120} height={120} alt="empty" />
      <Typography>{content ?? 'Ủa có thấy gì đâu?'}</Typography>
    </Stack>
  );
};
