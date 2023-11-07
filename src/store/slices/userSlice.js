import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  tokenIat: null,
  tokenExp: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setTokenTime(state, action) {
      state.tokenExp = action.payload.exp;
      state.tokenIat = action.payload.iat;
    },
    removeTokenTime(state) {
      state.tokenExp = null;
      state.tokenIat = null;
    },
  },
});

export const { setUser, removeUser, removeTokenTime, setTokenTime } =
  userSlice.actions;
export default userSlice.reducer;
