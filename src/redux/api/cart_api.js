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
      invalidatesTags: (result, error, { userId }) => [
        { type: "cart", id: userId },
      ],
      onQueryStarted: async (
        { userId, ...product },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", userId, (draft) => {
            const existing = draft.find(
              (item) => item.productId === product.productId
            );
            if (existing) {
              existing.quantity += 1;
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
      providesTags: (result, error, userId) => [{ type: "cart", id: userId }],
    }),
    removeitem: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `cart/removeFromCart/${userId}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", id: userId },
      ],
      async onQueryStarted(
        { userId, productId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", userId, (draft) => {
            const index = draft.findIndex(
              (item) => item.productId === productId
            );
            if (index !== -1) {
              draft.splice(index, 1);
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
    decreaseQuantity: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `cart/decreaseQuantity/${userId}/${productId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "cart", id: userId },
      ],
      onQueryStarted: async (
        { userId, productId },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", userId, (draft) => {
            const item = draft.find((item) => item.productId === productId);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
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
  }),
});

export const {
  useAddedToCartMutation,
  useGetCartQuery,
  useRemoveitemMutation,
  useDecreaseQuantityMutation,
} = cartApi;
