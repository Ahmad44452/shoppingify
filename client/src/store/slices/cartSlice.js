import { createSlice } from "@reduxjs/toolkit";
import { fetchPendingCart } from "../asyncThunks/cartThunk";

const initialState = {
  cart: null,
  cartError: null
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    }
  },
  extraReducers: (builder) => {
    // SET ERROR TO NULL WHEN REQUEST TO FETCH DATA IS MADE
    builder.addCase(fetchPendingCart.pending, (state, action) => {
      state.cartError = null
    })
    // SET DATA IF FETCH REQUEST IF FULFILLED
    builder.addCase(fetchPendingCart.fulfilled, (state, action) => {
      state.cart = action.payload
    })
    // SET ERROR IF FETCH REQUEST IS REJECTED
    builder.addCase(fetchPendingCart.rejected, (state, action) => {
      state.cartError = action.error.message
    })
  }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;