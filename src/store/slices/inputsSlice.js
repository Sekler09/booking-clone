/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  dates: '',
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
    changeCity(state, action) {
      state.city = action.payload;
    },
    changeDate(state, action) {
      state.dates = action.payload;
    },
    incrementAdults(state) {
      state.counts.adults++;
    },
    incrementRooms(state) {
      state.counts.rooms++;
    },
    incrementChildren(state) {
      state.counts.children++;
    },
    decrementAdults(state) {
      state.counts.adults--;
    },
    decrementRooms(state) {
      state.counts.rooms--;
    },
    decrementChildren(state) {
      state.counts.children--;
    },
    changeAdults(state, action) {
      state.counts.adults = action.payload;
    },
    changeRooms(state, action) {
      state.counts.rooms = action.payload;
    },
    changeChildren(state, action) {
      state.counts.children = action.payload;
    },
  },
});

export const {
  changeCity,
  changeDate,
  incrementAdults,
  incrementRooms,
  incrementChildren,
  decrementAdults,
  decrementRooms,
  decrementChildren,
  changeRooms,
  changeAdults,
  changeChildren,
} = inputsSlice.actions;
export default inputsSlice.reducer;
