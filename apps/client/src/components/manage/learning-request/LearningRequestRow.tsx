import {
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ILearningRequestCustome } from '@client/pages/manage/learning-requests';
import { RequestRow } from './RequestRow';

interface Props {
  request: ILearningRequestCustome;
  order: number;
  onRefresh: () => void;
}
export const LearningRequestRow = ({ request, order, onRefresh }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow>
        <TableCell align="center">{order}</TableCell>
        <TableCell align="center">{request.course.name}</TableCell>
        <TableCell align="center">
          {request.course.administrator.name}
        </TableCell>
        <TableCell align="center">{request.requests.length}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => setOpen(!open)}>
            <VisibilityIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Danh sách người đăng kí
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell component={'th'}>Tên</TableCell>
                    <TableCell component={'th'}>Email</TableCell>
                    <TableCell component={'th'}>Avatar</TableCell>
                    <TableCell component={'th'}>Ngày đăng ký</TableCell>
                    <TableCell component={'th'} align="center">
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {request.requests.map((i, index) => (
                    <RequestRow onRefresh={onRefresh} request={i} key={index} />
                  ))}
                </TableBody>
              </Table>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
