import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/users_api";
import authReducers from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
