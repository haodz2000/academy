import {
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { RoundedButton } from '@client/components/ui/buttons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CoursesApiCreateRequest } from '@libs/openapi-generator/generated';
import { UploadSingleImage } from '@client/components/ui/UploadSingleImage';
import { TopicSelect } from '@client/components/ui/TopicSelect';
import { useNotify } from '@client/components/notification/hook';
import { useCreateCourseMutation } from '@client/hooks/apis/courses/useCreateCourseMutation';
import { useRouter } from 'next/router';

const schema = yup
  .object({
    cover: yup.mixed().required('Trường này không thể bỏ trống.'),
    name: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();

export const FormCreateCourse = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { notify, notifyError } = useNotify();
  const courseCreateMutation = useCreateCourseMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<CoursesApiCreateRequest>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      topicsIds: [],
      cover: undefined,
    },
  });
  const onReset = () => {
    reset({
      name: '',
      description: '',
      topicsIds: [],
      cover: undefined,
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await courseCreateMutation.mutateAsync({
        cover: data.cover,
        description: data.description,
        name: data.name,
        topicsIds: [...data.topicsIds],
      });
      reset({
        name: '',
        description: '',
        topicsIds: [],
        cover: undefined,
      });
      notify();
      router.push('/manage/courses/' + response.data.slug);
    } catch (error) {
      notifyError({ error });
    } finally {
      setLoading(false);
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
          New Course
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <UploadSingleImage
              defaultImage={null}
              file={field.value}
              setFile={(file) => field.onChange(file)}
              sx={{ width: '100px', height: '100px' }}
            />
          )}
        />
        <Stack>
          <Typography> Name course *</Typography>
          <FormControl>
            <TextField
              {...register('name')}
              size="small"
              sx={{
                bgcolor: '#9494941a',
                '& fieldset': {
                  border: 'none',
                },
              }}
              placeholder="Name course ..."
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Topic *</Typography>
          <FormControl>
            <Controller
              control={control}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <FormControl fullWidth>
                  <TopicSelect
                    topicIds={value}
                    onValueChange={onChange}
                    {...field}
                  />
                  <FormHelperText error={!!fieldState.error}>
                    {fieldState.error?.message}
                  </FormHelperText>
                </FormControl>
              )}
              name="topicsIds"
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Descripton</Typography>
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
              placeholder="Name course ..."
            />
          </FormControl>
        </Stack>
        <Stack gap={1} justifyContent="flex-end" flexDirection={'row'}>
          <RoundedButton onClick={onReset} color="secondary">
            Reset
          </RoundedButton>
          <RoundedButton loading={loading} disabled={!isValid} type="submit">
            Save
          </RoundedButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
