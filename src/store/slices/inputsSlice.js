import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  dates: {
    from: '',
    to: '',
  },
  counts: {
    adults: 1,
    children: 0,
    rooms: 1,
  },
};

const inputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
    setDate(state, action) {
      state.dates = action.payload;
    },
    setAdults(state, action) {
      state.counts.adults = action.payload;
    },
    setRooms(state, action) {
      state.counts.rooms = action.payload;
    },
    setChildren(state, action) {
      state.counts.children = action.payload;
    },
  },
});

export const { setCity, setDate, setRooms, setAdults, setChildren } =
  inputsSlice.actions;
export default inputsSlice.reducer;
