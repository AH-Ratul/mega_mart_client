import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "../api/products_api";

const initialState = {
  product: "",
  loading: true,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.product = action.payload;
          state.loading = false;
        }
      )
      .addMatcher(
        productApi.endpoints.getProducts.matchRejected,
        (state) => {
          state.product = "";
          state.loading = true;
        }
      );
  },
});

export default productSlice.reducer;
