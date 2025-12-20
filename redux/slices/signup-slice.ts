import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { setToken } from "@/lib/cookie/cookie";
import type { AppDispatch, RootState } from "@/redux/store";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

export interface SignupState {
  user: UserModuleUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SignupState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Manual Signup thunk
export const signupUser = createAsyncThunk<
  { token: string; user: any },
  { email: string; password: string; name: string },
  { rejectValue: string }
>("signup/manual", async ({ email, password, name }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      email,
      password,
      name,
    });
    const { token, user } = response.data;
    setToken(token);
    return { token, user };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

// Google Signup thunk
export const googleSignup = createAsyncThunk<
  { token: string; user: any },
  { idToken: string },
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("signup/google", async ({ idToken }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/google", {
      idToken,
    });
    const { token, user } = response.data;
    setToken(token);
    return { token, user };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Google signup failed");
  }
});

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearSignupError: (state) => {
      state.error = null;
    },
    resetSignupState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Manual Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Google Signup
    builder
      .addCase(googleSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(googleSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSignupError, resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;
