import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_baseurl}api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (products) => ({
        url: "products/getProducts",
        method: "GET",
        body: products,
      }),
    }),
    getProductById: builder.query({
      query: (id) => `products/getProducts/${id}`,
    }),
    searchProducts: builder.query({
      query: (keyword) => {
        return {
          url: "products/search",
          params: { keyword },
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} = productApi;
