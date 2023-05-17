import React, { useMemo, useState } from 'react';
import { Discuss } from './Discuss';
import { FormCreateDiscuss } from './FormCreateDiscuss';
import { Paper, Stack, Typography } from '@mui/material';
import { LessonResponse } from '@libs/openapi-generator/generated';
import { useDiscussionsQuery } from '@client/hooks/apis/discussions/useDiscussionsQuery';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';

interface Props {
  lesson: LessonResponse;
}
export const Discusstion = ({ lesson }: Props) => {
  const [page, setPage] = useState<number>(1);
  const discussionsQuery = useDiscussionsQuery({
    lessonId: lesson?.id,
    page: page,
  });
  const discussions = useMemo(() => {
    return discussionsQuery.data?.data || [];
  }, [discussionsQuery.data?.data]);
  const onRefresh = () => {
    discussionsQuery.refetch();
  };
  if (discussionsQuery.isLoading) {
    return <LoadingPage />;
  }
  return (
    <Paper sx={{ padding: 3, bgcolor: '#18273F', borderRadius: 3 }}>
      <Stack gap={2}>
        <Typography variant="h3" fontSize={22} fontWeight={700}>
          Thảo luận
        </Typography>
        <Stack
          gap={3}
          maxHeight={600}
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              width: '0em',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#203453',
              borderRadius: '50px',
            },
          }}
        >
          {discussions.map((discussion, index) => (
            <Discuss discussion={discussion} key={index} />
          ))}
        </Stack>
        <Stack>
          <FormCreateDiscuss onCreated={onRefresh} lesson={lesson} />
        </Stack>
      </Stack>
    </Paper>
  );
};
