import { RoundedButton } from '@client/components/ui/buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LessonResponse,
  LessonsApiUpdateRequest,
} from '@libs/openapi-generator/generated';
import {
  Collapse,
  Dialog,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNotify } from '@client/components/notification/hook';
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateLessonMutation } from '@client/hooks/apis/courses/useUpdateLessonMutation';
import { UploadSingleVideo } from '@client/components/ui/UploadSingleVideo';
import { TypeLesson } from '@libs/constants/entities/Lesson';
import { getLinkLesson, getVideoLesson } from '@client/utils/lesson';
import ReactPlayer from 'react-player';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
    type: yup.number().required('Trường này không thể bỏ trống.'),
  })
  .required();

interface Props {
  lesson: LessonResponse;
  onCreated: () => void;
}
export const FormUpdateLesson = ({ lesson, onCreated }: Props) => {
  const videoRef = useRef<ReactPlayer>();
  const [timeUpload, setTimeUpload] = useState<number>(0);
  const [timeYoutube, setTimeYoutube] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
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
    formState: { errors, isValid },
  } = useForm<LessonsApiUpdateRequest>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      link: getLinkLesson(lesson),
      type: lesson.type,
      time: lesson.time,
    },
  });
  const type = watch('type');
  const link = watch('link');
  useEffect(() => {
    if (link) {
      setTimeout(() => {
        setTimeYoutube(videoRef.current?.getDuration());
      }, 500);
    }
  }, [link]);
  const onSubmit = handleSubmit(async (data) => {
    const { video, link, ...rest } = data;
    try {
      let time = lesson.time;
      if (data.type == TypeLesson.UPLOAD) {
        time = timeUpload;
      }
      if (data.type == TypeLesson.YOUTUBE) {
        time = timeYoutube;
      }
      let upload: LessonsApiUpdateRequest = {
        ...rest,
      };
      if (link !== lesson.video.path && type == TypeLesson.YOUTUBE) {
        upload = {
          ...upload,
          link,
          time: Math.floor(time),
        };
      }
      if (type == TypeLesson.UPLOAD) {
        upload = {
          ...upload,
          video,
          time: Math.floor(time),
          link: undefined,
        };
      }
      await updateLessonMutation.mutateAsync({
        ...upload,
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
            <Typography>Hình thức</Typography>
            <FormControl>
              <Controller
                rules={{ required: true }}
                name="type"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value={TypeLesson.UPLOAD}
                      control={<Radio />}
                      label="Upload"
                    />
                    <FormControlLabel
                      value={TypeLesson.YOUTUBE}
                      control={<Radio />}
                      label="Youtube"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Collapse in={type == TypeLesson.UPLOAD}>
              <Stack>
                <Typography>Video</Typography>
                <FormControl>
                  <Controller
                    name="video"
                    control={control}
                    render={({ field }) => (
                      <UploadSingleVideo
                        setTime={setTimeUpload}
                        defaultVideo={getVideoLesson(lesson)}
                        file={field.value}
                        setFile={(file) => field.onChange(file)}
                        sx={{ height: '300px' }}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
            </Collapse>
            <Collapse in={type == TypeLesson.YOUTUBE}>
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
                  <ReactPlayer
                    ref={videoRef}
                    style={{ zIndex: 1000 }}
                    width={'100%'}
                    height={'100%'}
                    controls
                    url={link}
                  />
                </FormControl>
              </Stack>
            </Collapse>
          </Stack>
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
                placeholder="Description lesson ..."
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
