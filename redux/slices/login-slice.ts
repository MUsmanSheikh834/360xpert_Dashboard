// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "@/lib/axios/axios-instance";
// import { setToken, setUserCookies } from "@/lib/cookie/cookie";
// import { requestNotificationPermission } from "@/lib/firebase/firebase";
// import type { AppDispatch, RootState } from "@/redux/store";
// import { UserModuleUser } from "@/app/[locale]/users/types/user";
// import { createLogger } from "@/logger/logger";

// const log = createLogger("firebase");

// export interface LoginState {
//   user: UserModuleUser | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: LoginState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
// };

// /**
//  * Generate FCM token after successful login
//  */
// const generateFcmToken = async () => {
//   try {
//     await requestNotificationPermission();
//   } catch (error) {
//     log.error({ error }, "Error generating FCM token");
//   }
// };

// // Manual Login thunk
// export const loginUser = createAsyncThunk<
//   { token: string; user: any },
//   { email: string; password: string },
//   { rejectValue: string }
// >("login/manual", async ({ email, password }, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post("/auth/login", {
//       email,
//       password,
//     });
//     const { token, user } = response.data;
//     setToken(token);
//     setUserCookies(user);

//     // Generate FCM token after successful login
//     generateFcmToken();

//     return { token, user };
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || "Login failed");
//   }
// });

// // Google Login thunk
// export const googleLogin = createAsyncThunk<
//   { token: string; user: any },
//   { idToken: string },
//   { dispatch: AppDispatch; state: RootState; rejectValue: string }
// >("login/google", async ({ idToken }, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post("/auth/google", {
//       idToken,
//     });
//     const { token, user } = response.data;
//     setToken(token);
//     setUserCookies(user);

//     // Generate FCM token after successful login
//     generateFcmToken();

//     return { token, user };
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || "Google login failed");
//   }
// });

// const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     clearLoginError: (state) => {
//       state.error = null;
//     },
//     resetLoginState: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       state.isLoading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     // Manual Login
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });

//     // Google Login
//     builder
//       .addCase(googleLogin.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(googleLogin.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//       })
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearLoginError, resetLoginState } = loginSlice.actions;
// export default loginSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "@/lib/axios/axios-instance"; // TODO: uncomment when backend is ready
import { setToken, setUserCookies } from "@/lib/cookie/cookie";
import { requestNotificationPermission } from "@/lib/firebase/firebase";
import type { AppDispatch, RootState } from "@/redux/store";
import { UserModuleUser } from "@/app/[locale]/users/types/user";
import { createLogger } from "@/logger/logger";

const log = createLogger("firebase");

export interface LoginState {
  user: UserModuleUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const generateFcmToken = async () => {
  try {
    await requestNotificationPermission();
  } catch (error) {
    log.error({ error }, "Error generating FCM token");
  }
};

// ================================================================
// MOCK DATA — delete this block when backend is ready
// ================================================================
const MOCK_TOKEN = "mock-jwt-token-abc123";
const MOCK_USER: Partial<UserModuleUser> = {
  _id: "mock-user-1",
  name: "Test User",
  email: "test@test.com",
};
// ================================================================

// Manual Login thunk
export const loginUser = createAsyncThunk<
  { token: string; user: any },
  { email: string; password: string },
  { rejectValue: string }
>("login/manual", async ({ email, password }, { rejectWithValue }) => {
  try {
    // ── MOCK (remove when backend is ready) ──────────────────────
    await new Promise((res) => setTimeout(res, 800));
    if (email !== "test@test.com" || password !== "password123") {
      return rejectWithValue("Invalid email or password");
    }
    const token = MOCK_TOKEN;
    const user = MOCK_USER;
    // ── END MOCK ─────────────────────────────────────────────────

    // TODO: uncomment when backend is ready
    // const response = await axiosInstance.post("/auth/login", { email, password });
    // const { token, user } = response.data;

    setToken(token);
    setUserCookies(user);
    generateFcmToken();
    return { token, user };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// Google Login thunk
export const googleLogin = createAsyncThunk<
  { token: string; user: any },
  { idToken: string },
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("login/google", async ({ idToken }, { rejectWithValue }) => {
  try {
    // ── MOCK (remove when backend is ready) ──────────────────────
    await new Promise((res) => setTimeout(res, 800));
    if (!idToken) return rejectWithValue("No Google token received");
    const token = MOCK_TOKEN;
    const user: Partial<UserModuleUser> = {
      ...MOCK_USER,
      name: "Google User",
      email: "google@gmail.com",
    };
    // ── END MOCK ─────────────────────────────────────────────────

    // TODO: uncomment when backend is ready
    // const response = await axiosInstance.post("/auth/google", { idToken });
    // const { token, user } = response.data;

    setToken(token);
    setUserCookies(user);
    generateFcmToken();
    return { token, user };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Google login failed");
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.error = null;
    },
    resetLoginState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Manual Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Google Login
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLoginError, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
