import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { UserResponse } from '@libs/openapi-generator/generated';

interface UserInterface {
  user: any | null;
}

const initialUser: UserInterface = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
