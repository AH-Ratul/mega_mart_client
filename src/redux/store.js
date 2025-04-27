import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/users_api";
import authReducers from "./slices/authSlice";
import productReducers from "./slices/productSlice";
import { productApi } from "./api/products_api";
import quantityReducer from "./slices/quantitySlice";
import cartReducer from "./slices/cartSlice";
import { cartApi } from "./api/cart_api";
import { contactApi } from "./api/contact_api";
import { orderApi } from "./api/order_api";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    products: productReducers,
    quantity: quantityReducer,
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      contactApi.middleware,
      orderApi.middleware
    ),
});
