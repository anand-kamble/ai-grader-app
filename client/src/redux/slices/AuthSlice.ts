import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserError } from "shared-types";
import { APIService } from "../../services";

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  user?: User | null;
  error?: UserError | null;
}

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  user: null,
  error: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.loggedIn = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User | undefined>) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = AuthSlice.actions;

export const login = createAsyncThunk<User, User, { rejectValue: UserError }>("auth/login", async (user: User, { rejectWithValue }) => {
  try {
    const response = await APIService.post("/user/login", {
      data: user,
    });
    
    if (response.status !== 200) {
      return rejectWithValue(response.data);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(UserError.UnknownError);
  }
});

export default AuthSlice.reducer;
