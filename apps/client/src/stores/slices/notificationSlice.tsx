import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert/Alert';

export interface AppNotification {
  id: string;
  content: string;
  type: AlertColor;
  error?: any;
}

interface NotificationState {
  notifications: AppNotification[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlide = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      const payload = action.payload;
      state.notifications.push({
        id: payload.id,
        type: payload.type,
        content: payload.content,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export default notificationSlide.reducer;

export const { addNotification, removeNotification } =
  notificationSlide.actions;
