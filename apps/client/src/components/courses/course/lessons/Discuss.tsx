import { DiscussionResponse } from '@libs/openapi-generator/generated';
import { Avatar, Link, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  discussion: DiscussionResponse;
}
export const Discuss = ({ discussion }: Props) => {
  return (
    <Stack flexDirection={'row'} width={'100%'} gap={2}>
      <Stack>
        {discussion.creator && (
          <Avatar
            src={discussion.creator.avatar.path}
            sx={{ height: 60, width: 60 }}
          >
            H
          </Avatar>
        )}
      </Stack>
      <Stack gap={1}>
        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography
            component={Link}
            href={'#'}
            underline="none"
            fontWeight={600}
          >
            {discussion.creator?.name}
          </Typography>
          <Typography color="#BAD9FB66" fontSize={10} fontWeight={600}>
            {new Date(discussion.created_at).toLocaleDateString()}
          </Typography>
        </Stack>
        <Typography color="#D8E3EE">{discussion.description}</Typography>
      </Stack>
    </Stack>
  );
};
