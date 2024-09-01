import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_baseurl}api/v1`,
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (userCredentials) => ({
        url: "/users/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgetPassword",
        method: "POST",
        body: email,
      }),
    }),
    verifyCode: builder.mutation({
      query: (credentials) => ({
        url: "/users/verifyCode",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (password) => ({
        url: "/users/resetPassword",
        method: "PATCH",
        body: password,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetUserQuery,
  useForgetPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = userApi;
