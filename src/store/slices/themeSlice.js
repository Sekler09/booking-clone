import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    onThemeChange(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { onThemeChange } = themeSlice.actions;
export default themeSlice.reducer;
