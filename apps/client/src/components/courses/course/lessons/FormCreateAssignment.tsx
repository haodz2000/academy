import {
  Dialog,
  Divider,
  FormControl,
  IconButton,
  Stack,
  StackProps,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
  CreateAssignmentDto,
  LessonResponse,
} from '@libs/openapi-generator/generated';
import { RoundedButton } from '@client/components/ui/buttons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNotify } from '@client/components/notification/hook';
import { useCreateAssignmentMutation } from '@client/hooks/apis/assignments/useCreateAssignmentMutation';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();
interface Props extends StackProps {
  lesson: LessonResponse;
  onCreated: () => void;
}
export const FormCreateAssignment = ({
  lesson,
  onCreated,
  ...props
}: Props) => {
  const { notify, notifyError } = useNotify();
  const [open, setOpen] = React.useState(false);
  const createAssignmentMutation = useCreateAssignmentMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateAssignmentDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      lesson_id: lesson?.id,
      title: '',
      description: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createAssignmentMutation.mutateAsync({
        createAssignmentDto: { ...data },
      });
      reset();
      notify();
      onCreated();
    } catch (error) {
      notifyError({ error });
    } finally {
      reset({
        lesson_id: lesson.id,
        title: '',
        description: '',
      });
      handleClose();
    }
  });
  return (
    <Stack {...props}>
      <Tooltip title="Add assignment">
        <IconButton onClick={handleClickOpen}>
          <AddIcon htmlColor="#FFF" fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog
        sx={{
          '.MuiPaper-root': { backgroundColor: '#21262c' },
        }}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <Stack component={'form'} onSubmit={onSubmit} gap={2} padding={2}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3" fontSize={22} fontWeight={600}>
              CREATE NEW ASSIGNMENT
            </Typography>
            <IconButton>
              <ClearIcon htmlColor="#FFF" />
            </IconButton>
          </Stack>
          <Divider sx={{ background: '#FFF' }} />
          <Stack gap={2}>
            <Stack>
              <Typography>Title*</Typography>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  {...register('title')}
                  InputProps={{ sx: { color: '#000' } }}
                  sx={{ '& fieldset': { border: 'none' }, bgcolor: '#fff' }}
                  placeholder="Title..."
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography>Description*</Typography>
              <FormControl fullWidth>
                <TextField
                  {...register('description')}
                  minRows={4}
                  multiline
                  InputProps={{ sx: { color: '#000' } }}
                  sx={{ '& fieldset': { border: 'none' }, bgcolor: '#fff' }}
                  placeholder="Title..."
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            gap={1}
            flexDirection="row"
            justifyContent="flex-end"
            paddingX={2}
          >
            <RoundedButton color="secondary">Reset</RoundedButton>
            <RoundedButton disabled={!isValid} type="submit">
              Save
            </RoundedButton>
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};
