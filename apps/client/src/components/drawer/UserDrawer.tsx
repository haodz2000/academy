import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useAppSelector } from '@client/stores';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from '../ui/Link';
import { RoundedButton } from '../ui/buttons';

export const UserDrawer = () => {
  const user = useAppSelector((state) => state.user.user);
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => {
    setState(!state);
  };

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer}>
          <Avatar src={user.avatar?.path || ''}></Avatar>
        </IconButton>
        <Drawer anchor={'right'} open={state} onClose={toggleDrawer}>
          <Stack
            sx={{ width: 300, bgcolor: '#151f32' }}
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
            height={1}
          >
            <Paper sx={{ bgcolor: '#151f32', width: 1, height: 1 }}>
              <Stack paddingX={2} paddingY={4} gap={5}>
                <Stack alignItems="center" gap={2}>
                  <Avatar
                    sx={{ height: 80, width: 80 }}
                    src={user.avatar?.path}
                  />
                  <Typography variant="h3" fontSize={26} fontWeight={600}>
                    {user.name}
                  </Typography>
                </Stack>
                <Stack gap={2}>
                  <Stack
                    component={Link}
                    href={'#'}
                    underline="none"
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                  >
                    <SettingsIcon htmlColor="#fff" />
                    <Typography
                      component={Link}
                      underline="none"
                      href={'/profile/setting'}
                      color={'#FFF'}
                      fontSize={18}
                      variant="h6"
                      fontWeight={700}
                    >
                      Thiết lập
                    </Typography>
                  </Stack>
                  <Stack
                    component={'form'}
                    method="POST"
                    action="/api/auth/logout"
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                  >
                    <RoundedButton
                      sx={{ px: 2 }}
                      type="submit"
                      variant="text"
                      startIcon={<LogoutIcon htmlColor="#fff" />}
                    >
                      <Typography
                        color={'#FFF'}
                        variant="h6"
                        fontSize={18}
                        fontWeight={700}
                      >
                        Đăng xuất
                      </Typography>
                    </RoundedButton>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Drawer>
      </React.Fragment>
    </div>
  );
};
