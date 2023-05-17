import { AppLayout } from '@client/components/layouts/AppLayout';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { RoundedButton } from '@client/components/ui/buttons';
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { ReactElement, useMemo } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from '@client/components/ui/Link';
import { withAuth } from '@client/hocs/withAuth';
import { useTeachingRequestsQuery } from '@client/hooks/apis/teaching-requests/useTeachingRequestsQuery';
import { StatusTeachingRequest } from '@libs/constants/entities/TeachingRequest';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { RequestRow } from '@client/components/manage/teaching-request/RequestRow';
import { Empty } from '@client/components/ui/Empty';

const Index = () => {
  const requestsQuery = useTeachingRequestsQuery({
    status: StatusTeachingRequest.Pending,
    page: 1,
  });
  const requests = useMemo(() => {
    return requestsQuery.data?.data ?? [];
  }, [requestsQuery.data?.data]);
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
      <Stack width={'30%'}>
        <Stack width={220}>
          <NavbarManage>
            <RoundedButton>Back</RoundedButton>
          </NavbarManage>
        </Stack>
      </Stack>
      <Stack width={'70%'}>
        <Stack paddingX={2} gap={2}>
          <Stack gap={2}>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: '#1b2a46' }}
            >
              <Table>
                <TableHead>
                  <TableCell>STT</TableCell>
                  <TableCell>Khóa học</TableCell>
                  <TableCell>Người đăng kí</TableCell>
                  <TableCell>Ngày đăng kí</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableHead>
                <TableBody>
                  {requests.map((request, index) => (
                    <RequestRow
                      onRefresh={onRefresh}
                      request={request}
                      order={index + 1}
                      key={index}
                    />
                  ))}
                  {!requests.length && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Empty content="Không có yêu cầu nào" />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
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
