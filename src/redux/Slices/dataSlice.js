import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ID: "",
  NAME: "",
  SURNAME: "",
  RATE: "",
  CELL: "",
  TIME: "",
};

export const clientSlice = createSlice({
  name: "Client",
  initialState,
  reducers: {
    updateId: (state, action) => {
      state.ID = action.payload;
    },
    updateName: (state, action) => {
      state.NAME = action.payload;
    },
    updateSurname: (state, action) => {
      state.SURNAME = action.payload;
    },
    updateCell: (state, action) => {
      state.CELL = action.payload;
    },
    updateRate: (state, action) => {
      state.RATE = action.payload;
    },
    updateTime: (state, action) => {
      state.TIME = action.payload;
    },
    incrementInvoice: (state) => {
      state.ID = state.ID + 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateId,
  updateRate,
  updateCell,
  updateSurname,
  updateName,
  updateTime,
  incrementInvoice,
} = clientSlice.actions;

export default clientSlice.reducer;
