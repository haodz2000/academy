import { RoundedButton } from '@client/components/ui/buttons';
import {
  CourseDetailResponse,
  CreateSectionDto,
} from '@libs/openapi-generator/generated';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useNotify } from '@client/components/notification/hook';
import { useCreateSectionMutation } from '@client/hooks/apis/courses/useCreateSectionMutation';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();
interface Props {
  course: CourseDetailResponse;
  onCreated: () => void;
}
export const FormCreateSection = ({ course, onCreated }: Props) => {
  const { notify, notifyError } = useNotify();
  const createSectionMutation = useCreateSectionMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateSectionDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      course_id: course.id,
      title: '',
      description: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createSectionMutation.mutateAsync({
        createSectionDto: { ...data },
      });
      reset();
      notify();
      onCreated();
    } catch (error) {
      notifyError({ error });
    } finally {
      reset({
        course_id: course.id,
        title: '',
        description: '',
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
          Tạo chương
        </Typography>
      </Stack>
      <Stack gap={2}>
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
              placeholder="Name course ..."
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Mô tả</Typography>
          <FormControl>
            <TextField
              {...register('description')}
              size="small"
              multiline
              minRows={4}
              sx={{
                bgcolor: '#9494941a',
                '& fieldset': {
                  border: 'none',
                },
              }}
              placeholder="Description ..."
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </FormControl>
        </Stack>
        <Stack gap={1} justifyContent="flex-end" flexDirection={'row'}>
          <RoundedButton color="secondary">Reset</RoundedButton>
          <RoundedButton type="submit" disabled={!isValid}>
            Save
          </RoundedButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
