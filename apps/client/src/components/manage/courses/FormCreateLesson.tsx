import { RoundedButton } from '@client/components/ui/buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LessonsApiCreateRequest,
  SectionFullResponse,
} from '@libs/openapi-generator/generated';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNotify } from '@client/components/notification/hook';
import { useCreateLessonMutation } from '@client/hooks/apis/courses/useCreateLessonMutation';
import { UploadSingleVideo } from '@client/components/ui/UploadSingleVideo';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  section: SectionFullResponse;
  onCreated: () => void;
}
export const FormCreateLesson = ({ section, onCreated }: Props) => {
  const { notify, notifyError } = useNotify();
  const createLessonMutation = useCreateLessonMutation();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<LessonsApiCreateRequest>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      sectionId: section.id,
      title: '',
      description: '',
      video: undefined,
      link: '',
    },
  });
  const link = watch('link');
  const video = watch('video');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createLessonMutation.mutateAsync({
        ...data,
      });
      reset();
      notify();
      onCreated();
    } catch (error) {
      notifyError({ error });
    } finally {
      reset({
        sectionId: section.id,
        title: '',
        description: '',
        link: '',
        video: undefined,
      });
    }
  });
  return (
    <Stack
      position="relative"
      gap={2}
      component="form"
      sx={{ bgcolor: '#328AF11A', p: 3 }}
      onSubmit={onSubmit}
    >
      <Stack>
        <Typography variant="h3" fontSize={22} fontWeight={700}>
          Tạo bài giảng mới
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
      {!link && (
        <Stack>
          <Typography>Video</Typography>
          <FormControl>
            <Controller
              name="video"
              control={control}
              render={({ field }) => (
                <UploadSingleVideo
                  defaultVideo={null}
                  file={field.value}
                  setFile={(file) => field.onChange(file)}
                  sx={{ height: '300px' }}
                />
              )}
            />
          </FormControl>
        </Stack>
      )}
      {!video && (
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
  );
};
