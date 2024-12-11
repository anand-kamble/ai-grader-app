import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import ToastSlice from "./slices/ToastSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    toast: ToastSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;