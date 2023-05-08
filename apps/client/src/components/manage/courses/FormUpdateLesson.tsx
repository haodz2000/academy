import { RoundedButton } from '@client/components/ui/buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LessonResponse,
  UpdateLessonDto,
} from '@libs/openapi-generator/generated';
import {
  Dialog,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNotify } from '@client/components/notification/hook';
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateLessonMutation } from '@client/hooks/apis/courses/useUpdateLessonMutation';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
    link: yup.string().required('Trường này không thể bỏ trống.'),
    time: yup.number().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  lesson: LessonResponse;
  onCreated: () => void;
}
export const FormUpdateLesson = ({ lesson, onCreated }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { notify, notifyError } = useNotify();
  const updateLessonMutation = useUpdateLessonMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateLessonDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      title: lesson.title,
      description: lesson.description,
      time: lesson.time,
      link: lesson.link,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateLessonMutation.mutateAsync({
        id: lesson.id,
        updateLessonDto: { ...data },
      });
      notify();
      onCreated();
      handleClose();
    } catch (error) {
      notifyError({ error });
    }
  });
  return (
    <Stack>
      <Tooltip title="Edit">
        <IconButton onClick={handleClickOpen}>
          <EditIcon htmlColor="#FFF" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'md'}
        fullWidth
        sx={{
          '.MuiPaper-root': { backgroundColor: '#111316' },
        }}
      >
        <Stack
          position="relative"
          gap={2}
          component="form"
          sx={{ bgcolor: '#328AF11A', p: 3 }}
          onSubmit={onSubmit}
        >
          <Stack>
            <Typography variant="h3" fontSize={22} fontWeight={700}>
              Update lesson
            </Typography>
          </Stack>
          <Stack>
            <Typography>Title *</Typography>
            <FormControl>
              <TextField
                {...register('title')}
                size="small"
                sx={{
                  bgcolor: '#9494941a',
                  '& fieldset': {
                    border: 'none',
                  },
                }}
                placeholder="Title lesson ..."
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </FormControl>
          </Stack>
          <Stack>
            <Typography>Link *</Typography>
            <FormControl>
              <TextField
                {...register('link')}
                size="small"
                sx={{
                  bgcolor: '#9494941a',
                  '& fieldset': {
                    border: 'none',
                  },
                }}
                placeholder="Title lesson ..."
                error={!!errors.link}
                helperText={errors.link?.message}
              />
            </FormControl>
          </Stack>
          <Stack>
            <Typography>Time *</Typography>
            <FormControl>
              <TextField
                {...register('time')}
                size="small"
                sx={{
                  bgcolor: '#9494941a',
                  '& fieldset': {
                    border: 'none',
                  },
                }}
                placeholder="Title lesson ..."
                error={!!errors.time}
                helperText={errors.time?.message}
              />
            </FormControl>
          </Stack>
          <Stack>
            <Typography>Description *</Typography>
            <FormControl>
              <TextField
                {...register('description')}
                size="small"
                sx={{
                  bgcolor: '#9494941a',
                  '& fieldset': {
                    border: 'none',
                  },
                }}
                placeholder="Title lesson ..."
                multiline
                minRows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </FormControl>
          </Stack>
          <Stack gap={1} flexDirection="row" justifyContent="flex-end">
            <RoundedButton color="secondary">Reset</RoundedButton>
            <RoundedButton type="submit" disabled={!isValid}>
              Save
            </RoundedButton>
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};
