import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_baseurl}api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    initiateOrder: builder.mutation({
      query: (data) => ({
        url: `order/initiateOrder`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useInitiateOrderMutation } = orderApi;
