import { RoundedButton } from '@client/components/ui/buttons';
import {
  FormControl,
  Paper,
  Stack,
  StackProps,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { UserResponse, UserUpdateDto } from '@libs/openapi-generator/generated';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNotify } from '../notification/hook';
import { useProfileUpdateMutation } from '@client/hooks/apis/users/useProfileUpdateMutation';
import { UpdateAvatarForm } from './UpdateAvatarForm';

interface Props extends StackProps {
  user: UserResponse;
}
const colors = {
  label: '#BAD9FC',
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const urlRegExp =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'\\(\\)\\*\\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|\/|\?)*)?$/i;

const schema = yup
  .object({
    name: yup.string().required('Trường này không thể bỏ trống.'),
    description: yup.string().required('Trường này không thể bỏ trống.'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    facebook: yup.string().matches(urlRegExp, 'URL không hợp lệ'),
    github: yup.string().matches(urlRegExp, 'URL không hợp lệ'),
    twitter: yup.string().matches(urlRegExp, 'URL không hợp lệ'),
    job: yup.string().required('Trường này không thể bỏ trống.'),
  })
  .required();

export const UpdateUserForm = ({ user, ...props }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { notify, notifyError } = useNotify();
  const updateProfileMutation = useProfileUpdateMutation();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<UserUpdateDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      description: user.description,
      facebook: user.facebook,
      github: user.github,
      twitter: user.twitter,
      job: user.job,
      phone: user.phone,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await updateProfileMutation.mutateAsync({
        userUpdateDto: { ...data },
      });
      notify();
    } catch (error) {
      notifyError({ error });
    } finally {
      setLoading(false);
    }
  });
  return (
    <Stack
      sx={{ margin: '0 auto' }}
      width={'100%'}
      maxWidth={820}
      px={5}
      py={2}
      component={Paper}
      elevation={1}
      bgcolor={'rgba(50, 138, 241, 0.04)'}
      flexDirection="row"
      {...props}
    >
      <Stack width="100%" flexDirection="row" alignItems="flex-start">
        <Stack width="30%" padding="0 30px 0 0">
          <UpdateAvatarForm user={user} />
        </Stack>
        <Stack width="70%" onSubmit={onSubmit} component={'form'} gap={3}>
          <Stack flexDirection="row" gap={2} alignItems="center">
            <Typography variant="h6" fontWeight={700}>
              Cập nhật tài khoản
            </Typography>
            <RoundedButton
              sx={{ bgcolor: '#BAD9FC80' }}
              size="small"
              startIcon={<AccountBalanceWalletIcon />}
            >
              Guests
            </RoundedButton>
          </Stack>
          <Stack gap={2}>
            <Stack>
              <Typography variant="caption" color={colors.label}>
                Họ và tên
              </Typography>
              <FormControl>
                <TextField
                  {...register('name')}
                  variant="standard"
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="caption" color={colors.label}>
                Số điện thoại
              </Typography>
              <FormControl>
                <TextField
                  {...register('phone')}
                  placeholder="09xxx"
                  variant="standard"
                  size="small"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="caption" color={colors.label}>
                Chức vụ
              </Typography>
              <FormControl>
                <TextField
                  {...register('job')}
                  placeholder="Developer"
                  variant="standard"
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="caption" color={colors.label}>
                Facebook
              </Typography>
              <FormControl>
                <TextField
                  {...register('facebook')}
                  placeholder="http://facebook.com.vn/username"
                  variant="standard"
                  size="small"
                  error={!!errors.facebook}
                  helperText={errors.facebook?.message}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="caption" color={colors.label}>
                Twiter
              </Typography>
              <FormControl>
                <TextField
                  {...register('twitter')}
                  placeholder="http://twiter.com.vn/username"
                  variant="standard"
                  size="small"
                  error={!!errors.twitter}
                  helperText={errors.twitter?.message}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="caption" color={colors.label}>
                Github
              </Typography>
              <FormControl>
                <TextField
                  {...register('github')}
                  placeholder="http://github.com.vn/username"
                  variant="standard"
                  size="small"
                  error={!!errors.github}
                  helperText={errors.github?.message}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="caption" color={colors.label}>
                Mô tả
              </Typography>
              <FormControl>
                <TextField
                  {...register('description')}
                  placeholder="Mô tả..."
                  variant="standard"
                  multiline
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack flexDirection="row" justifyContent="flex-end">
              <RoundedButton
                loading={loading}
                disabled={!isValid}
                type="submit"
              >
                Cập nhật
              </RoundedButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
