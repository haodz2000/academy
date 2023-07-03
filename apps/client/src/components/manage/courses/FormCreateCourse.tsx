import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Radio,
  Collapse,
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
import { ModeCourse } from '@libs/constants/entities/Course';

const schema = yup
  .object({
    cover: yup.mixed().required('Trường này không thể bỏ trống.'),
    name: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
    mode: yup.number().required('Trường này không thể bỏ trống.').min(1),
    price: yup.number().min(0),
    discount: yup.number().min(0).max(100),
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
    watch,
    control,
    formState: { isValid },
  } = useForm<CoursesApiCreateRequest>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      topicsIds: [],
      cover: undefined,
      mode: 1,
      price: 0,
      discount: 0,
    },
  });
  const mode = watch('mode');
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
        mode: data.mode,
        price: data.price,
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
          Tạo khóa học mới
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
          <Typography> Tên khóa học *</Typography>
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
              placeholder="ReactJS ..."
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Chọn chủ đề *</Typography>
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
          <Typography>Hình thức</Typography>
          <FormControl>
            <Controller
              rules={{ required: true }}
              control={control}
              name="mode"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Miễn phí"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Trả phí"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Collapse in={mode == ModeCourse.PayFee}>
            <Stack>
              <Stack>
                <FormControl>
                  <Typography>Giá (VND)*</Typography>
                  <TextField
                    {...register('price')}
                    size="small"
                    sx={{
                      bgcolor: '#9494941a',
                      '& fieldset': {
                        border: 'none',
                      },
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack>
                <FormControl>
                  <Typography>Discount (%)*</Typography>
                  <TextField
                    {...register('discount')}
                    size="small"
                    sx={{
                      bgcolor: '#9494941a',
                      '& fieldset': {
                        border: 'none',
                      },
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Collapse>
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
              placeholder="Mô tả ..."
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
