import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_baseurl}api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    addedToCart: builder.mutation({
      query: ({ userId, ...product }) => ({
        url: `cart/addToCart/${userId}`,
        method: "POST",
        body: product,
      }),
      async onQueryStarted({ userId, product }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("geteCart", userId, (draft) => {
            const existing = draft.find(
              (item) => item.productId === product.productId
            );
            if (existing) {
              existing.quantity += quantity || 1;
            } else {
              draft.push({ ...product });
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getCart: builder.query({
      query: (userId) => ({
        url: `cart/getCart/${userId}`,
        method: "GET",
      }),
    }),
    removeitem: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `cart/removeFromCart/${userId}/${productId}`,
        method: "DELETE",
      }),
    }),
    decreaseQuantity: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `cart/decreaseQuantity/${userId}/${productId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAddedToCartMutation,
  useGetCartQuery,
  useRemoveitemMutation,
  useDecreaseQuantityMutation,
} = cartApi;
