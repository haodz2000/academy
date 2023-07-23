import { StatusLearningRequest } from '@libs/constants/entities/LearningRequest';
import { TeachingRequestResponse } from '@libs/openapi-generator/generated';
import {
  Avatar,
  Chip,
  Grid,
  Paper,
  Stack,
  StackProps,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { RoundedButton } from '../ui/buttons';
import { useConfirm } from 'material-ui-confirm';
import { useNotify } from '../notification/hook';
import { Can } from '@client/abilities';
import { IdAction, IdSubject } from '@libs/constants/abilities';
import { useTeachingRequestRejectMutation } from '@client/hooks/apis/teaching-requests/useTeachingRequestRejectMutation';
import { useTeachingRequestAcceptMutation } from '@client/hooks/apis/teaching-requests/useTeachingRequestAcceptMutation';

const getStatusLearningRequest = (status: number) => {
  let text = '';
  let color: 'info' | 'success' | 'error' | 'default';
  switch (status) {
    case StatusLearningRequest.Pending: {
      text = 'Đang chờ';
      color = 'info';
      break;
    }
    case StatusLearningRequest.Approve: {
      text = 'Đã chấp nhận';
      color = 'success';
      break;
    }
    case StatusLearningRequest.Reject: {
      text = 'Đã từ chối';
      color = 'error';
      break;
    }
    default: {
      color = 'default';
      break;
    }
  }
  return <Chip color={color} label={text} />;
};

interface Props extends StackProps {
  request: TeachingRequestResponse;
  refresh: () => void;
}
export const TeachingRequestDetail = ({
  request,
  refresh,
  ...props
}: Props) => {
  const { notify, notifyError } = useNotify();
  const confirm = useConfirm();
  const teachingRequestAcceptMutation = useTeachingRequestAcceptMutation();
  const teachingRequestRejectMutation = useTeachingRequestRejectMutation();
  const onAccept = async () => {
    confirm({ title: 'Bạn chắc chắn đồng ý' })
      .then(async () => {
        try {
          await teachingRequestAcceptMutation.mutateAsync({
            id: request.id,
          });
          notify({ content: 'Success' });
          refresh();
        } catch (error) {
          notifyError({ error });
        }
      })
      .catch(() => {
        //
      });
  };
  const onReject = async () => {
    confirm({ title: 'Bạn chắc chắn muốn từ chối?' })
      .then(async () => {
        try {
          await teachingRequestRejectMutation.mutateAsync({
            id: request.id,
          });
          notify({ content: 'Success' });
          refresh();
        } catch (error) {
          notifyError({ error });
        }
      })
      .catch(() => {
        //
      });
  };
  return (
    <Stack {...props} alignItems={'center'} justifyContent={'center'} width={1}>
      <Stack
        position={'relative'}
        bgcolor={'#687a9b33'}
        component={Paper}
        width={1}
        maxWidth={700}
        padding={3}
        gap={5}
      >
        <Stack position={'absolute'} top={0} left={0}>
          {getStatusLearningRequest(request.status)}
        </Stack>
        <Stack>
          <Typography align="center" variant="h6" fontWeight={600}>
            Yêu cầu mở khóa học
          </Typography>
        </Stack>
        <Grid container>
          <Grid item md={6} paddingX={1}>
            <Stack gap={3}>
              <Stack gap={1}>
                <Typography fontWeight={600}>Người yêu cầu</Typography>
                <Stack gap={1}>
                  <Avatar
                    alt=""
                    sx={{ height: 60, width: 60 }}
                    src={request.requester.avatar.path}
                  />
                  <TextField
                    size="small"
                    sx={{
                      '& fieldset': { border: 'none' },
                      bgcolor: 'rgba(165, 165, 165, 0.2)',
                    }}
                    InputProps={{ readOnly: true }}
                    value={request.requester.name}
                  />
                  <TextField
                    sx={{
                      '& fieldset': { border: 'none' },
                      bgcolor: 'rgba(165, 165, 165, 0.2)',
                    }}
                    InputProps={{ readOnly: true }}
                    size="small"
                    value={request.requester.email}
                  />
                </Stack>
              </Stack>
              <Stack gap={1}>
                <Typography fontWeight={600}>Ngày yêu cầu</Typography>
                <Stack gap={1}>
                  <TextField
                    sx={{
                      '& fieldset': { border: 'none' },
                      bgcolor: 'rgba(165, 165, 165, 0.2)',
                    }}
                    InputProps={{ readOnly: true }}
                    size="small"
                    value={new Date(request.created_at).toLocaleDateString()}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack gap={1} paddingX={1} alignItems={'center'}>
              <Typography fontWeight={600}>Khóa học</Typography>
              <Stack gap={1} alignItems={'center'}>
                <Avatar
                  sx={{ height: 180, width: 180 }}
                  alt=""
                  src={request.course.cover.path}
                />
                <Typography>{request.course.name}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Can I={IdAction.Manage} a={IdSubject.TeachingRequests}>
          <Stack flexDirection="row" justifyContent={'flex-end'} gap={1}>
            <RoundedButton
              disabled={request.status !== StatusLearningRequest.Pending}
              color="inherit"
              onClick={onReject}
            >
              Từ chối
            </RoundedButton>
            <RoundedButton
              disabled={request.status !== StatusLearningRequest.Pending}
              onClick={onAccept}
            >
              Cho phép
            </RoundedButton>
          </Stack>
        </Can>
      </Stack>
    </Stack>
  );
};
