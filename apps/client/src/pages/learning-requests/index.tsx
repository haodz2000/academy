import { AppLayout } from '@client/components/layouts/AppLayout';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { ReactElement, useMemo } from 'react';
import { withAuth } from '@client/hocs/withAuth';
import { useLearningRequestsQuery } from '@client/hooks/apis/learning-requests/useLeariningRequestsQuery';
import { StatusLearningRequest } from '@libs/constants/entities/LearningRequest';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import {
  CourseResponse,
  LearningRequestResponse,
} from '@libs/openapi-generator/generated';
import { LearningRequestRow } from '@client/components/manage/learning-request/LearningRequestRow';
import { Empty } from '@client/components/ui/Empty';

export interface ILearningRequestCustome {
  course: CourseResponse;
  requests: Partial<LearningRequestResponse>[];
}

const Index = () => {
  const requestsQuery = useLearningRequestsQuery({
    status: StatusLearningRequest.Pending,
    page: 1,
  });
  const requests = useMemo(() => {
    return requestsQuery.data?.data ?? [];
  }, [requestsQuery.data?.data]);
  const data = useMemo(() => {
    const map: Record<string, ILearningRequestCustome> = {};
    for (const item of requests) {
      const { course, ...rest } = item;
      if (map[course.id]) {
        map[course.id].requests.push(rest);
      } else {
        map[course.id] = {
          course,
          requests: [rest],
        };
      }
    }
    return Object.values(map);
  }, [requests]);
  const onRefresh = () => {
    requestsQuery.refetch();
  };
  if (requestsQuery.isLoading) {
    return <LoadingPage />;
  }
  if (requestsQuery.isError) {
    return <ErrorPage />;
  }
  return (
    <Stack width={'100%'} paddingX={2} flexDirection={'row'} gap={2}>
      <Stack width={1}>
        <Stack paddingX={2} gap={2}>
          <Stack gap={2}>
            <Typography variant="h6">
              Danh sách yêu cầu tham gia khóa học
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: '#1b2a46' }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component={'th'} align="center">
                      STT
                    </TableCell>
                    <TableCell component={'th'} align="center">
                      Khóa học
                    </TableCell>
                    <TableCell component={'th'} align="center">
                      Chủ sở hữu
                    </TableCell>
                    <TableCell component={'th'} align="center">
                      Số lượng đăng ký
                    </TableCell>
                    <TableCell component={'th'} align="center">
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!data.length &&
                    data.map((item, index) => (
                      <LearningRequestRow
                        onRefresh={onRefresh}
                        request={item}
                        order={index + 1}
                        key={index}
                      />
                    ))}
                </TableBody>
                {!requestsQuery.data?.data.length && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Empty content="Không có yêu cầu nào" />
                    </TableCell>
                  </TableRow>
                )}
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={true} custom={false}>
      {page}
    </AppLayout>
  );
};
export const getServerSideProps = withAuth();

export default Index;
