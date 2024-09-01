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
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetUserQuery,
  useForgetPasswordMutation,
} = userApi;
