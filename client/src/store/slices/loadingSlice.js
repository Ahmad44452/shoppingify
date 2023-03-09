import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategoriesWithItems } from "../asyncThunks/categoriesThunk";
import { fetchPendingCart, saveCart } from "../asyncThunks/cartThunk";

const initialState = {
  loadingStack: []
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loadingStack.push(true);
    },
    stopLoading: (state, action) => {
      state.loadingStack.shift();
    }
  },
  extraReducers: (builder) => {
    // SET LOADING TO TRUE WHEN FETCH REQUEST IS PENDING
    builder.addCase(fetchAllCategoriesWithItems.pending, (state, action) => {
      state.loadingStack.push(true);
    })
    // SET LOADING TO FALSE AFTER PORIMSE IS FULFILLED OR REJECTED
    builder.addCase(fetchAllCategoriesWithItems.rejected, (state, action) => {
      state.loadingStack.shift();
    })
    builder.addCase(fetchAllCategoriesWithItems.fulfilled, (state, action) => {
      state.loadingStack.shift();
    })


    /******************************************************************** */
    /* CART CASES */
    // SET LOADING TO TRUE WHEN FETCH REQUEST IS PENDING
    builder.addCase(fetchPendingCart.pending, (state, action) => {
      state.loadingStack.push(true);
    })
    // SET LOADING TO FALSE AFTER PORIMSE IS FULFILLED OR REJECTED
    builder.addCase(fetchPendingCart.rejected, (state, action) => {
      state.loadingStack.shift();
    })
    builder.addCase(fetchPendingCart.fulfilled, (state, action) => {
      state.loadingStack.shift();
    })

    /******************************************************************** */
    /* CART SAVE CASES */
    // SET LOADING TO TRUE WHEN FETCH REQUEST IS PENDING
    builder.addCase(saveCart.pending, (state, action) => {
      state.loadingStack.push(true);
    })
    // SET LOADING TO FALSE AFTER PORIMSE IS FULFILLED OR REJECTED
    builder.addCase(saveCart.rejected, (state, action) => {
      state.loadingStack.shift();
    })
    builder.addCase(saveCart.fulfilled, (state, action) => {
      state.loadingStack.shift();
    })
  }
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;