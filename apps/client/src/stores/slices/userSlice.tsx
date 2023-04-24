import { UserResponse } from '@libs/openapi-generator/generated';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInterface {
  user: UserResponse | null;
}

const initialUser: UserInterface = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
