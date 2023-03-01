import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// First ever Thunk
export const storeCartData = createAsyncThunk(
  "cart/storeData",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://redux-app-349bb-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );
      if (!response.ok) return rejectWithValue("Something went wrong!");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err?.message ?? "Something went wrong!");
    }
  }
);

export const fetchCartData = createAsyncThunk(
  "cart/fetchData",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://redux-app-349bb-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) return rejectWithValue("Something went wrong!");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err?.message ?? "Something went wrong!");
    }
  }
);
const initialState = {
  cartItems: [],
  toggleCart: true,
  notification: null,
  loading: false,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      // Cart is Empty!
      if (!state.cartItems.length) {
        return {
          ...state,
          changed: true,
          cartItems: [{ ...payload, total: payload.price, quantity: 1 }],
        };
      } else {
        // Cart has some items!
        const itemFound = state.cartItems.find(
          (o) => o.title === payload.title
        );

        if (itemFound) {
          const updatedState = state.cartItems.map((item) => {
            if (item.title === payload.title) {
              return {
                ...item,

                quantity: item.quantity + 1,
                total: item.price * (item.quantity + 1),
              };
            } else return item;
          });
          return {
            ...state,
            changed: true,
            cartItems: [...updatedState],
          };
        } else {
          return {
            ...state,
            changed: true,
            cartItems: [
              ...state.cartItems,
              {
                ...payload,
                quantity: 1,
                total: payload.price,
              },
            ],
          };
        }
      }
    },
    removeItem: (state, { payload }) => {
      const itemFound = state.cartItems.find((item) => item.title === payload);
      if (itemFound && itemFound.quantity > 1) {
        const updatedState = state.cartItems.map((item) => {
          if (item.title === payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
              total: item.total - item.price,
            };
          } else return item;
        });
        return {
          ...state,
          changed: true,
          cartItems: [...updatedState],
        };
      } else if (itemFound && itemFound.quantity === 1) {
        // Its the last
        const updatedCart = state.cartItems.filter(
          (item) => item.title !== payload
        );
        return {
          ...state,
          changed: true,
          cartItems: updatedCart,
        };
      }
    },
    toggleCart: (state) => {
      return {
        ...state,
        toggleCart: !state.toggleCart,
      };
    },
    showNotification: (state, { payload }) => {
      const { status, title, message } = payload;
      return {
        ...state,
        notification: {
          status,
          title,
          message,
        },
      };
    },
    resetNotification: (state) => {
      return { ...state, notification: null };
    },
  },
  extraReducers: {
    [storeCartData.pending]: (state) => {
      state.loading = true;
      state.notification = {
        status: "pending",
        title: "Add to Cart",
        message: "Adding items to Cart..",
      };
    },
    [storeCartData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // Disburse Notification!
      state.notification = {
        status: "success",
        title: "Add to Cart",
        message: "Items added to Cart!",
      };
    },
    [storeCartData.rejected]: (state) => {
      state.loading = false;
      state.notification = {
        status: "error",
        title: "Add to Cart",
        message: "Adding items to Cart failed!",
      };
    },
    [fetchCartData.pending]: (state) => {
      state.loading = true;
    },
    [fetchCartData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (!payload) {
        state.cartItems = [];
      } else {
        state.cartItems = payload;
      }
      state.initialCartFetch = true;
    },
    [fetchCartData.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
