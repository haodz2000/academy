import { RoundedButton } from '@client/components/ui/buttons';
import {
  CreateDiscussionDto,
  LessonResponse,
} from '@libs/openapi-generator/generated';
import { FormControl, Stack, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateDiscussionMutation } from '@client/hooks/apis/discussions/useCreateDicussionMutation';
import { useNotify } from '@client/components/notification/hook';

const schema = yup
  .object({
    lesson_id: yup.number().required(),
    description: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  lesson: LessonResponse;
  onCreated: () => void;
}
export const FormCreateDiscuss = ({ lesson, onCreated }: Props) => {
  const { notify, notifyError } = useNotify();
  const createDiscussionMutation = useCreateDiscussionMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateDiscussionDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      lesson_id: lesson?.id,
      description: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createDiscussionMutation.mutateAsync({
        createDiscussionDto: data,
      });
      reset({
        lesson_id: lesson.id,
        description: '',
      });
      notify();
      onCreated();
    } catch (error) {
      notifyError({ error });
    }
  });
  return (
    <Stack component={'form'} onSubmit={onSubmit} gap={1}>
      <FormControl>
        <TextField
          {...register('description')}
          placeholder="Write something..."
          multiline
          minRows={3}
        />
      </FormControl>
      <Stack flexDirection={'row'} justifyContent="flex-end">
        <RoundedButton
          disabled={!isValid}
          type="submit"
          sx={{ bgcolor: '#151f32', color: '#fff' }}
        >
          Submit
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
