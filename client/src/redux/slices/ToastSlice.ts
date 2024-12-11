import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  open: boolean;
  message: string;
  variant: "success" | "error" | "warning" | "info";
}

export interface OpenToastPayload {
  message: string;
  variant: "success" | "error" | "warning" | "info";
}

const initialState: ToastState = {
  open: false,
  message: "",
  variant: "success",
};

export const ToastSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<OpenToastPayload>) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
      state.open = true;
    },
    close: state => {
      state.open = false;
      state.message = "";
      state.variant = "success";
    },
  },
});

export const { open, close} = ToastSlice.actions;
export default ToastSlice.reducer;
