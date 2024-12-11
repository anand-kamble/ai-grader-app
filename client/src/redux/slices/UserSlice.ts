import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserError, UserLoginResponse, UserLoginResponseSuccess } from "shared-types";
import { APIService } from "../../services";

/**
 * Represents the state structure for user authentication.
 * 
 * @property {boolean} loggedIn - Indicates if the user is logged in.
 * @property {boolean} loading - Represents the loading state during authentication.
 * @property {User | null} user - Holds user data upon successful login.
 * @property {UserError | null} error - Contains error details if login fails.
 */
export interface UserState {
  loggedIn: boolean;
  loading: boolean;
  user?: User | null;
  error?: UserError | null;
}

/** Initial state for the user slice. */
const initialState: UserState = {
  loggedIn: false,
  loading: false,
  user: null,
  error: null,
};

/**
 * The `UserSlice` handles user authentication state management.
 * It provides actions for logging out and tracks login status via async actions.
 */
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Logs out the user by setting `loggedIn` to `false`.
     * 
     * @param {UserState} state - The current state.
     */
    logout: state => {
      state.loggedIn = false;
    },
  },
  extraReducers(builder) {
    builder
      /**
       * Handles the pending state when a login request is initiated.
       * 
       * @param {UserState} state - The current state.
       */
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      
      /**
       * Handles the fulfilled state when a login request succeeds.
       * 
       * @param {UserState} state - The current state.
       * @param {PayloadAction<UserLoginResponseSuccess | undefined>} action - The payload containing user data.
       */
      .addCase(login.fulfilled, (state, action: PayloadAction<UserLoginResponseSuccess | undefined>) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload?.user;
        state.error = null;
      })

      /**
       * Handles the rejected state when a login request fails.
       * 
       * @param {UserState} state - The current state.
       * @param {PayloadAction<UserError>} action - The payload containing error details.
       */
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = UserSlice.actions;

/**
 * The `login` async thunk handles user login by making an API request.
 * 
 * @param {Pick<User, "email" | "password">} user - The user's email and password.
 * @returns {Promise<UserLoginResponseSuccess>} - The user login response on success.
 * @throws {UserError} - Rejects with an error if the login fails.
 */
export const login = createAsyncThunk<
  UserLoginResponseSuccess,
  Pick<User, "email" | "password">,
  { rejectValue: UserError }
>(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await APIService.post("/user/login", user);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error as UserError);
    }
  }
);

export default UserSlice.reducer;
