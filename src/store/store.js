import { configureStore } from '@reduxjs/toolkit';

import inputsReducer from './slices/inputsSlice';

export default configureStore({
  reducer: {
    inputs: inputsReducer,
  },
});
