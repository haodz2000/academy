import {
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
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
import { ModeCourse } from '@libs/constants/entities/Course';
import { Back } from '@client/components/ui/Back';

const schema = yup
  .object({
    name: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
    cover: yup.mixed(),
    mode: yup.number().required('Trường này không thể bỏ trống.').min(1),
    price: yup.number().min(0).nullable(),
    discount: yup.number().min(0).max(100),
    topicsIds: yup.array(),
  })
  .required();

interface Props {
  course: CourseDetailResponse;
}
export const FormUpdateCourse = ({ course }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { notify, notifyError } = useNotify();
  const courseUpdateMutation = useUpdateCourseMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      id: course.id,
      name: course.name,
      description: course.description,
      topicsIds: course.topics?.length ? course.topics?.map((i) => i.id) : [],
      mode: course.mode,
      price: course.course_price.price,
      discount: course.course_price.discount,
    },
  });
  const mode = watch('mode');
  const onReset = () => {
    reset({
      id: course.id,
      name: course.name,
      description: course.description,
      topicsIds: course.topics?.length ? course.topics?.map((i) => i.id) : [],
      mode: course.mode,
      price: course.course_price.price,
      discount: course.course_price.discount,
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
      <Stack gap={3}>
        <Back />
        <Typography variant="h3" fontSize={22} fontWeight={700}>
          Cập nhật khóa học
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <UploadSingleImage
              defaultImage={course.cover}
              file={field.value ? field.value : null}
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
              placeholder="ReactJS,..."
              error={!!errors.name}
              // helperText={errors.name?.message}
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
                    topicIds={value ? value : []}
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
                  <Typography>Giá *</Typography>
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
                  <Typography>Discount *</Typography>
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
              error={!!errors.description}
              // helperText={errors.description?.message}
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
