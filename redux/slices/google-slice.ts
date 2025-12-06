import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { setToken } from "@/lib/cookie/cookie";
import type { AppDispatch, RootState } from "@/redux/store";

export interface GoogleAuthState {
  isLoading: boolean;
  error: string | null;
}

const initialState: GoogleAuthState = {
  isLoading: false,
  error: null,
};

// Google Login thunk
export const googleLogin = createAsyncThunk<
  { token: string; user: any },
  { idToken: string },
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("google/login", async ({ idToken }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance.post("/auth/google", {
      idToken,
    });
    const { token, user } = response.data;
    setToken(token);

    // Update auth state by importing and dispatching the auth slice action
    const { setAuthUser } = await import("./auth-slice");
    dispatch(setAuthUser({ token, user }));

    return { token, user };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Google login failed");
  }
});

// Google Signup thunk
export const googleSignup = createAsyncThunk<
  { token: string; user: any },
  { idToken: string },
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("google/signup", async ({ idToken }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance.post("/auth/google", {
      idToken,
    });
    const { token, user } = response.data;
    setToken(token);

    // Update auth state
    const { setAuthUser } = await import("./auth-slice");
    dispatch(setAuthUser({ token, user }));

    return { token, user };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Google signup failed");
  }
});

const googleSlice = createSlice({
  name: "google",
  initialState,
  reducers: {
    clearGoogleError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Google Login
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Google Signup
    builder
      .addCase(googleSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleSignup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(googleSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGoogleError } = googleSlice.actions;
export default googleSlice.reducer;
