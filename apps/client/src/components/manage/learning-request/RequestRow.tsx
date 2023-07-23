import {
  Avatar,
  IconButton,
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
import { LearningRequestResponse } from '@libs/openapi-generator/generated';
import { useLearningRequestAcceptMutation } from '@client/hooks/apis/learning-requests/useLearningRequestAcceptMutation';
import { useConfirm } from 'material-ui-confirm';
import { useNotify } from '@client/components/notification/hook';
import { useLearningRequestRejectMutation } from '@client/hooks/apis/learning-requests/useLearningRequestRejectMutation';
import { IdAction, IdSubject } from '@libs/constants/abilities';
import { Can } from '@client/abilities';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

interface Props extends TableRowProps {
  request: Partial<LearningRequestResponse>;
  onRefresh: () => void;
}
export const RequestRow = ({ request, onRefresh, ...props }: Props) => {
  const { notify, notifyError } = useNotify();
  const confirm = useConfirm();
  const learningRequestAcceptMutation = useLearningRequestAcceptMutation();
  const learningRequestRejectMutation = useLearningRequestRejectMutation();
  const onAccept = async () => {
    if (request.id) {
      confirm({ title: 'Bạn chắc chắn chứ' })
        .then(async () => {
          try {
            await learningRequestAcceptMutation.mutateAsync({
              id: request.id ? request.id : '',
            });
            notify({ content: 'Success' });
            onRefresh();
          } catch (error) {
            notifyError({ error });
          }
        })
        .catch(() => {
          //
        });
    }
  };
  const onReject = async () => {
    confirm({ title: 'Bạn chắc chắn muốn từ chối?' })
      .then(async () => {
        try {
          await learningRequestRejectMutation.mutateAsync({
            id: request.id ? request.id : '',
          });
          notify({ content: 'Success' });
          onRefresh();
        } catch (error) {
          notifyError({ error });
        }
      })
      .catch(() => {
        //
      });
  };
  if (!request || request.requester) {
    return null;
  }
  return (
    <TableRow {...props}>
      {/* {
        request.requester&&(
          <>
          <TableCell component="th" scope="row">
            <Typography
              component={Link}
              href={'/profile/' + request?.requester.email.split('@')[0]}
              fontWeight={600}
            >
              {request?.requester.name}
            </Typography>
          </TableCell>
          <TableCell>{request.requester?request.requester.email:''}</TableCell>
          <TableCell>
            <Stack>
              <Avatar src={request?.requester.avatar.path} />
            </Stack>
          </TableCell>
          <TableCell>{request.created_at&&new Date(request.created_at).toLocaleDateString()}</TableCell>
          <TableCell>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent={'center'}
            >
              <IconButton
                LinkComponent={Link}
                href={'/learning-requests/' + request.id}
              >
                <VisibilityIcon color="primary" />
              </IconButton>
              <Can I={IdAction.Manage} a={IdSubject.LearningRequest}>
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
              </Can>
            </Stack>
          </TableCell>
          </>
        )
      } */}
    </TableRow>
  );
};
