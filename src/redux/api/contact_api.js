import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_baseurl}api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `contact/addContact/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useAddContactMutation } = contactApi;
