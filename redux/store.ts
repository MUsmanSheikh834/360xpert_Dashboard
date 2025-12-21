"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import usersReducer from "./slices/user-slice";
import loginReducer from "./slices/login-slice";
import signupReducer from "./slices/signup-slice";

const rootReducer = combineReducers({
  users: usersReducer,
  login: loginReducer,
  signup: signupReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"], // Only persist login state
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
