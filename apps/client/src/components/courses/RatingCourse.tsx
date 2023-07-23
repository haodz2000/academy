import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { CourseResponse, RateDto } from '@libs/openapi-generator/generated';
import { RoundedButton } from '../ui/buttons';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { FormControl, Rating, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRatingCourseMutation } from '@client/hooks/apis/courses/useRatingCourseMutation';
import { useNotify } from '../notification/hook';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const schema = yup
  .object({
    course_id: yup.number().required('Trường này không thể bỏ trống.'),
    point: yup
      .number()
      .min(1)
      .max(5)
      .required('Trường này không thể bỏ trống.'),
    comment: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  course: CourseResponse;
}
export const RatingCourse = ({ course }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { notify, notifyError } = useNotify();
  const ratingCourseMutation = useRatingCourseMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isValid },
  } = useForm<RateDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      course_id: course.id,
      point: 5,
      comment: 'Khóa học thật tuyệt vời!',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await ratingCourseMutation.mutateAsync({
        rateDto: data,
      });
      notify({ content: 'Đánh giá thành công' });
    } catch (error) {
      notifyError({ error });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  });

  return (
    <div>
      <RoundedButton
        startIcon={<StarOutlineIcon />}
        sx={{ bgcolor: '#797944' }}
        onClick={handleClickOpen}
      >
        Đánh giá
      </RoundedButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth={'xs'}
      >
        <Stack component="form" onSubmit={onSubmit}>
          <DialogTitle sx={{ color: 'black' }}>
            {'Đánh giá khóa học'}
          </DialogTitle>
          <DialogContent>
            <Stack alignItems="center" gap={3}>
              <Controller
                name="point"
                control={control}
                render={({ field }) => (
                  <Rating
                    name="size-small"
                    onChange={(e, v) => {
                      field.onChange(v);
                    }}
                    defaultValue={5}
                    size="large"
                  />
                )}
              />
              <FormControl fullWidth>
                <TextField
                  {...register('comment')}
                  size="small"
                  multiline
                  minRows={4}
                  sx={{
                    bgcolor: '#424242',
                    '& fieldset': {
                      border: 'none',
                    },
                  }}
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy bỏ</Button>
            <RoundedButton
              type="submit"
              disabled={!isValid}
              loading={loading}
              onClick={handleClose}
            >
              Đánh giá
            </RoundedButton>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};
