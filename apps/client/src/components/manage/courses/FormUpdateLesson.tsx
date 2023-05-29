import { RoundedButton } from '@client/components/ui/buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LessonResponse,
  LessonsApiUpdateRequest,
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
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNotify } from '@client/components/notification/hook';
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateLessonMutation } from '@client/hooks/apis/courses/useUpdateLessonMutation';
import { UploadSingleVideo } from '@client/components/ui/UploadSingleVideo';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  lesson: LessonResponse;
  onCreated: () => void;
}
export const FormUpdateLesson = ({ lesson, onCreated }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { notify, notifyError } = useNotify();
  const updateLessonMutation = useUpdateLessonMutation();
  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<LessonsApiUpdateRequest>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      link: lesson?.video?.path,
    },
  });
  const video = watch('video');

  const onSubmit = handleSubmit(async (data) => {
    const { video, link, ...rest } = data;
    try {
      await updateLessonMutation.mutateAsync({
        ...rest,
        [change && 'video']: video,
        link,
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
              Cập nhật bài giảng
            </Typography>
          </Stack>
          <Stack>
            <Typography>Tiêu đề *</Typography>
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
            <Typography>Video *</Typography>
            <FormControl>
              <Controller
                name="video"
                control={control}
                render={({ field }) => (
                  <UploadSingleVideo
                    defaultVideo={lesson.video}
                    file={field.value}
                    setFile={(file) => {
                      field.onChange(file);
                      setChange(true);
                      setValue('link', undefined);
                    }}
                    sx={{ height: '300px' }}
                  />
                )}
              />
            </FormControl>
          </Stack>
          {!video && !change && (
            <Stack>
              <Typography>Link Video</Typography>
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
          )}
          <Stack>
            <Typography>Mô tả *</Typography>
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
