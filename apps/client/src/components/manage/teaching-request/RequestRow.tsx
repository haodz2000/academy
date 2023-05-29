import {
  IconButton,
  Link,
  Stack,
  TableCell,
  TableRow,
  TableRowProps,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { TeachingRequestResponse } from '@libs/openapi-generator/generated';
import { useTeachingRequestAcceptMutation } from '@client/hooks/apis/teaching-requests/useTeachingRequestAcceptMutation';
import { useTeachingRequestRejectMutation } from '@client/hooks/apis/teaching-requests/useTeachingRequestRejectMutation';
import { useNotify } from '@client/components/notification/hook';
import { useConfirm } from 'material-ui-confirm';
import { StatusTeachingRequest } from '@libs/constants/entities/TeachingRequest';
import { Can } from '@client/abilities';
import { IdAction, IdSubject } from '@libs/constants/abilities';

interface Props extends TableRowProps {
  request: TeachingRequestResponse;
  order: number;
  onRefresh: () => void;
}
export const RequestRow = ({ request, order, onRefresh, ...props }: Props) => {
  const { notify, notifyError } = useNotify();
  const confirm = useConfirm();
  const acceptMutation = useTeachingRequestAcceptMutation();
  const rejectMutation = useTeachingRequestRejectMutation();
  const onAccept = async () => {
    confirm({ title: 'Bạn đã chắc chắn?' })
      .then(async () => {
        try {
          await acceptMutation.mutateAsync({ id: request.id });
          notify();
          onRefresh();
        } catch (error) {
          notifyError({ error });
        }
      })
      .catch(() => {
        //
      });
  };
  const onReject = async () => {
    confirm({ title: 'Bạn chắc chắn muốn xóa?' })
      .then(async () => {
        try {
          await rejectMutation.mutateAsync({ id: request.id });
          notify();
          onRefresh();
        } catch (error) {
          notifyError({ error });
        }
      })
      .catch(() => {
        //
      });
  };
  return (
    <TableRow {...props}>
      <TableCell>{order}</TableCell>
      <TableCell>
        <Typography
          component={Link}
          href={'/series/' + request.course.slug}
          underline="none"
        >
          {request.course.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          component={Link}
          underline="hover"
          href={'/profile/' + request.requester.email.split('@')[0]}
        >
          {request.requester.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>
          {new Date(request.created_at).toLocaleDateString()}
        </Typography>
      </TableCell>
      <TableCell>
        {request.status === StatusTeachingRequest.Pending && 'Đang chờ'}
      </TableCell>
      <Can I={IdAction.Manage} a={IdSubject.TeachingRequests}>
        <TableCell align="center">
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent={'center'}
          >
            <Tooltip title="Accept">
              <IconButton onClick={onAccept}>
                <CheckCircleIcon color="success" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject">
              <IconButton onClick={onReject}>
                <CancelIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </Can>
    </TableRow>
  );
};
