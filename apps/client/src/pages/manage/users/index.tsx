import { AppLayout } from '@client/components/layouts/AppLayout';
import { ErrorPage } from '@client/components/layouts/ErrorPage/ErrorPage';
import { LoadingPage } from '@client/components/layouts/LoadingPage/LoadingPage';
import { NavbarManage } from '@client/components/manage/NavbarManage';
import { RoundedButton } from '@client/components/ui/buttons';
import { withAuth } from '@client/hocs/withAuth';
import { useUsersQuery } from '@client/hooks/apis/users/useUsersQuery';
import {
  Avatar,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { ReactElement, useMemo, useState } from 'react';

const ManageUserPage = () => {
  const [page, setPage] = useState<number>(1);
  const usersQuery = useUsersQuery({
    q: '',
    page,
    limit: 10,
  });
  const users = useMemo(() => {
    return usersQuery.data?.data ?? [];
  }, [usersQuery.data?.data]);
  const totalPage = Math.ceil(usersQuery.data?.pagination?.total ?? 0 / 10);
  if (usersQuery.isLoading) {
    return <LoadingPage />;
  }
  if (usersQuery.isError) {
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
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell>Ảnh đại diện</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Quyền</TableCell>
                    <TableCell>Hoạt động lần cuối</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Avatar src={user.avatar.path} />
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role.name}</TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPage > 1 && (
              <Stack alignItems="flex-end">
                <Pagination
                  page={page}
                  count={totalPage}
                  onChange={(e, v) => {
                    setPage(v);
                  }}
                  color="primary"
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

ManageUserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={true} custom={false}>
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = withAuth();

export default ManageUserPage;
