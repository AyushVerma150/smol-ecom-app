import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import productSlice from "./product";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    product: productSlice.reducer,
  },
});

export default store;
