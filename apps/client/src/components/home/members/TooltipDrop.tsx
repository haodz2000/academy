import Link from '@client/components/ui/Link';
import { RoundedButton } from '@client/components/ui/buttons';
import { UserPublicResponse } from '@libs/openapi-generator/generated';
import { Avatar, Stack, StackProps, Typography } from '@mui/material';
import React from 'react';

interface Props extends StackProps {
  user: UserPublicResponse;
}
export const TooltipDrop = ({ user, ...props }: Props) => {
  return (
    <Stack {...props} gap={2} padding={1}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Avatar src={user?.avatar.path} />
        <Typography variant="h6" fontSize={18} fontWeight={700}>
          {user.name}
        </Typography>
      </Stack>
      <Stack>
        <RoundedButton
          component={Link}
          href={'/profile/' + user.email.split('@')[0]}
        >
          Watch
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
