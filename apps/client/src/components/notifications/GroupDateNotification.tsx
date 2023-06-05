import { Collapse, Stack, StackProps, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NotificationItem } from './NotificationItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { INotificationCustome } from '../drawer/NotificationDrawer';

interface Props extends StackProps {
  data: INotificationCustome;
}
export const GroupDateNotification = ({ data, ...props }: Props) => {
  const [expand, setExpand] = useState<boolean>(true);
  return (
    <Stack {...props}>
      <Stack
        sx={{ ':hover': { cursor: 'pointer' } }}
        onClick={() => setExpand(!expand)}
        padding={1}
        flexDirection="row"
        alignItems={'center'}
      >
        <Typography variant="body1" fontWeight={600}>
          {data.date}
        </Typography>
        {expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Stack>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <Stack gap={0.5}>
          {data.notifications.map((notification) => (
            <NotificationItem
              notification={notification}
              key={notification.id}
            />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
