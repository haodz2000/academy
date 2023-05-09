import {
  Paper,
  Stack,
  Typography,
  PaperProps,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Assigment } from './Assigment';
import { LessonResponse } from '@libs/openapi-generator/generated';
import { useAssignmentsQuery } from '@client/hooks/apis/assignments/useAssignmentsQuery';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { FormCreateAssignment } from './FormCreateAssignment';

interface Props extends PaperProps {
  lesson: LessonResponse;
}
export const ListAssignments = ({ lesson, ...props }: Props) => {
  const [page] = useState<number>(1);
  const assignmentsQuery = useAssignmentsQuery({ lessonId: lesson?.id, page });
  const assignments = useMemo(() => {
    return assignmentsQuery.data?.data ?? [];
  }, [assignmentsQuery.data?.data]);
  const onRefresh = () => {
    assignmentsQuery.refetch();
  };
  if (assignmentsQuery.isLoading) {
    return <LoadingPage />;
  }
  return (
    <Paper
      {...props}
      sx={{
        padding: 3,
        bgcolor: '#18273F',
        borderRadius: 3,
        ':hover': { bgcolor: 'rgba(63, 74, 92, 0.1)' },
      }}
    >
      <Stack gap={4}>
        <Stack flexDirection={'row'} gap={1} alignItems="center">
          <Typography variant="h3" fontSize={22} fontWeight={700}>
            Bài tập
          </Typography>
          <FormCreateAssignment onCreated={onRefresh} lesson={lesson} />
        </Stack>
        <Stack gap={3}>
          {assignments.map((assignment, index) => (
            <Assigment order={index + 1} assignment={assignment} key={index} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};
