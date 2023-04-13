import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export const ErrorLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box width={1} height={1}>
      {children}
    </Box>
  );
};
