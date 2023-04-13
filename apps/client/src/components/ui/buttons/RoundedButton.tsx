import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { FC } from 'react';
import styled from '@emotion/styled';

const RoundedButtonContainer = styled(LoadingButton)`
  border-radius: 100px;
  text-transform: none;
` as unknown as typeof LoadingButton;

export type RoundedButtonProps = LoadingButtonProps & {
  component?: unknown;
  href?: string;
  to?: unknown;
  target?: string;
};

export const RoundedButton: FC<RoundedButtonProps> = ({
  variant = 'contained',
  ...props
}) => {
  return <RoundedButtonContainer variant={variant} {...props} />;
};
