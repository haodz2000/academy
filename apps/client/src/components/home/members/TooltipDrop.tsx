import { RoundedButton } from '@client/components/ui/buttons';
import { UserPublicResponse } from '@libs/openapi-generator/generated';
import { Avatar, Stack, StackProps, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props extends StackProps {
  user: UserPublicResponse;
}
export const TooltipDrop = ({ user, ...props }: Props) => {
  const router = useRouter();
  return (
    <Stack {...props} gap={2} padding={1}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Avatar src={user.avatar ? user?.avatar.path : ''} />
        <Typography variant="h6" fontSize={18} fontWeight={700}>
          {user.name}
        </Typography>
      </Stack>
      <Stack>
        <RoundedButton
          onClick={() => router.push('/profile/' + user.email.split('@')[0])}
        >
          Watch
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
