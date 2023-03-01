import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      title: "Pizza",
      price: 4.99,
      description: "This is a first product - amazing!",
    },
    {
      title: "Pasta - Alfredo",
      price: 2.99,
      description: "This is a first product - amazing!",
    },
    {
      title: "Burger Spanish",
      price: 2.5,
      description: "This is a first product - amazing!",
    },
    {
      title: "Pickle",
      price: 1.15,
      description: "This is a first product - amazing!",
    },
  ],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: (state) => {
      return state.products;
    },
    addProducts: (state, { payload }) => {
      return {
        ...state,
        products: [...state.products, payload],
      };
    },
    editProduct: (state, { payload }) => {},
  },
});

export const productActions = productSlice.actions;
export default productSlice;
