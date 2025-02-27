import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: Array.isArray(storedCart) ? storedCart : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload
          );
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
