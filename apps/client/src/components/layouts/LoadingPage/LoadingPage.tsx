import {
  Box,
  LinearProgress,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import Link from '@client/components/ui/Link';
import { FC } from 'react';

interface Props extends StackProps {
  title?: string;
  description?: string;
}

export const LoadingPage: FC<Props> = ({ title, description, ...props }) => {
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
        <Stack width={'100%'} alignItems="">
          <Typography fontSize={32} fontWeight={800} textAlign="center">
            {'Loading...'}
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
