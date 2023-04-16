import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Avatar, IconButton, Paper, Stack } from '@mui/material';
import { useAppSelector } from '@client/stores';

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
          <Avatar src={user.avatar.path}></Avatar>
        </IconButton>
        <Drawer anchor={'right'} open={state} onClose={toggleDrawer}>
          <Stack
            sx={{ width: 400 }}
            // role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
            height={1}
          >
            <Paper sx={{bgcolor: '#151f32', width:1, height:1}}></Paper>
          </Stack>
        </Drawer>
      </React.Fragment>
    </div>
  );
};
