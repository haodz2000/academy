import { RoundedButton } from '@client/components/ui/buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LessonsApiCreateRequest,
  SectionFullResponse,
} from '@libs/openapi-generator/generated';
import {
  Collapse,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNotify } from '@client/components/notification/hook';
import { useCreateLessonMutation } from '@client/hooks/apis/courses/useCreateLessonMutation';
import { UploadSingleVideo } from '@client/components/ui/UploadSingleVideo';
import { TypeLesson } from '@libs/constants/entities/Lesson';
import { getTimeVideo } from '@client/utils/lesson';
import ReactPlayer from 'react-player';

const schema = yup
  .object({
    video: yup.mixed().notRequired(),
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
    type: yup.number().required('Trường này không thể bỏ trống.'),
    link: yup.string().notRequired(),
    time: yup.number().required(),
    sectionId: yup.number().required(),
  })
  .required();

interface Props {
  section: SectionFullResponse;
  onCreated: () => void;
}
export const FormCreateLesson = ({ section, onCreated }: Props) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [timeUpload, setTimeUpload] = useState<number>(0);
  const [timeYoutube, setTimeYoutube] = useState<number>(0);
  const { notify, notifyError } = useNotify();
  const createLessonMutation = useCreateLessonMutation();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      sectionId: section.id,
      type: TypeLesson.UPLOAD,
      title: '',
      description: '',
      video: undefined,
      link: '',
      time: 0,
    },
  });
  const type = watch('type');
  const link = watch('link');
  useEffect(() => {
    if (link) {
      setTimeout(() => {
        setTimeYoutube(videoRef.current ? videoRef.current.getDuration() : 0);
      }, 500);
    }
  }, [link]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      let time = 0;
      if (data.type == TypeLesson.UPLOAD) {
        time = timeUpload;
      }
      if (data.type == TypeLesson.YOUTUBE) {
        time = timeYoutube;
      }
      await createLessonMutation.mutateAsync({
        ...data,
        time: Math.floor(time),
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
        type: TypeLesson.UPLOAD,
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
            // helperText={errors.title?.message}
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
                    defaultVideo={null}
                    file={field.value ? field.value : null}
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
                // helperText={errors.link?.message}
              />
              <ReactPlayer
                ref={videoRef}
                style={{ zIndex: 1000 }}
                width={'100%'}
                height={'100%'}
                controls
                url={link ? link : ''}
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
            // helperText={errors.description?.message}
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
