import { RoundedButton } from '@client/components/ui/buttons';
import {
  SectionFullResponse,
  UpdateSectionDto,
} from '@libs/openapi-generator/generated';
import {
  Dialog,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useNotify } from '@client/components/notification/hook';
import { useUpdateSectionMutation } from '@client/hooks/apis/courses/useUpdateSectionMutation';
import EditIcon from '@mui/icons-material/Edit';

const schema = yup
  .object({
    title: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();
interface Props {
  section: SectionFullResponse;
  onCreated: () => void;
}
export const FormUpdateSection = ({ section, onCreated }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { notify, notifyError } = useNotify();
  const updateSectionMutation = useUpdateSectionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateSectionDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      title: section.title,
      description: section.description,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateSectionMutation.mutateAsync({
        id: section.id,
        updateSectionDto: { ...data },
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
              Update Section
            </Typography>
          </Stack>
          <Stack gap={2}>
            <Stack>
              <Typography> Title *</Typography>
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
              <RoundedButton color="secondary">Reset</RoundedButton>
              <RoundedButton type="submit" disabled={!isValid}>
                Save
              </RoundedButton>
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};
