import {
  Avatar,
  IconButton,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { UserResponse } from '@libs/openapi-generator/generated';

const colors = {
  label: '#BAD9FC',
};
interface Props extends StackProps {
  user: UserResponse;
}
export const UpdateAvatarForm = ({ user, ...props }: Props) => {
  return (
    <Stack {...props} gap={2} alignItems="center" justifyContent="center">
      <Stack position="relative">
        <Avatar src={user?.avatar?.path} sx={{ height: 120, width: 120 }} />
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            right: 5,
            bgcolor: 'rgba(143, 143, 143, 0.8)',
            bottom: 0,
          }}
        >
          <EditIcon />
        </IconButton>
      </Stack>
      <Stack>
        <Typography textAlign="center">Email</Typography>
        <Typography variant="caption" color={colors.label}>
          {user?.email}
        </Typography>
      </Stack>
    </Stack>
  );
};
