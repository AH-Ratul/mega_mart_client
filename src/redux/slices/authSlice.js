import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/users_api";

const initialState = {
  user: "",
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = "";
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addMatcher(userApi.endpoints.getMe.matchRejected, (state) => {
        state.user = "";
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
