import { RoundedButton } from '@client/components/ui/buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CreateLessonDto,
  SectionFullResponse,
} from '@libs/openapi-generator/generated';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNotify } from '@client/components/notification/hook';
import { useCreateLessonMutation } from '@client/hooks/apis/courses/useCreateLessonMutation';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
    link: yup.string().required('Trường này không thể bỏ trống.'),
    time: yup.number().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  section: SectionFullResponse;
}
export const FormCreateLesson = ({ section }: Props) => {
  const { notify, notifyError } = useNotify();
  const createLessonMutation = useCreateLessonMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateLessonDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      section_id: section.id,
      title: '',
      description: '',
      time: 0,
      link: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const respone = await createLessonMutation.mutateAsync({
        createLessonDto: { ...data },
      });
      reset();
      notify();
    } catch (error) {
      notifyError({ error });
    } finally {
      reset({
        section_id: section.id,
        title: '',
        description: '',
        time: 0,
        link: '',
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
          New lesson
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
  );
};
