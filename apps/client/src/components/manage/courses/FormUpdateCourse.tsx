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
import {
  CourseDetailResponse,
  CoursesApiUpdateRequest,
} from '@libs/openapi-generator/generated';
import { UploadSingleImage } from '@client/components/ui/UploadSingleImage';
import { TopicSelect } from '@client/components/ui/TopicSelect';
import { useNotify } from '@client/components/notification/hook';
import { useUpdateCourseMutation } from '@client/hooks/apis/courses/useUpdateCourseMutation';
import { useRouter } from 'next/router';

const schema = yup
  .object({
    name: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  course: CourseDetailResponse;
}
export const FormUpdateCourse = ({ course }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { notify, notifyError } = useNotify();
  const courseUpdateMutation = useUpdateCourseMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<CoursesApiUpdateRequest>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      id: course.id,
      name: course.name,
      description: course.description,
      topicIds: course.topics.map((i) => i.id),
    },
  });
  const onReset = () => {
    reset({
      name: course.name,
      description: course.description,
      topicIds: [],
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await courseUpdateMutation.mutateAsync({
        ...data,
      });
      notify();
      setLoading(false);
      router.push('/manage/courses');
    } catch (error) {
      notifyError({ error });
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
          Update Course
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <UploadSingleImage
              defaultImage={course.cover}
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
              error={!!errors.name}
              helperText={errors.name?.message}
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
              name="topicIds"
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
              placeholder="Description ..."
              error={!!errors.description}
              helperText={errors.description?.message}
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
