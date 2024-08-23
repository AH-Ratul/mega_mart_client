import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: '',
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload.user;
      localStorage.setItem("user", JSON.stringify(actions.payload));
    },
    logOut: (state) => {
      state.user = '';
      localStorage.removeItem("user");
    },
    setLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },
});

export const { login, setLoading, loginSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
