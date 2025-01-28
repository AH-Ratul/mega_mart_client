import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/users_api";
import authReducers from "./slices/authSlice";
import productReducers from "./slices/productSlice";
import { productApi } from "./api/products_api";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    products: productReducers,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productApi.middleware),
});
