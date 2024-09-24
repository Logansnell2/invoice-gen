import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./Slices/dataSlice";

export const store = configureStore({
  reducer: {
    Client: dataSlice,
  },
});
