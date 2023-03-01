import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategoriesWithItems } from "../asyncThunks/categoriesThunk";

const initialState = {
  allCategoriesWithItems: null,
  allCategoriesWithItemsError: null
};


export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setAllCategoriesWithItems: (state, action) => {
      state.allCategoriesWithItems = action.payload
    }
  },
  extraReducers: (builder) => {
    // SET ERROR TO NULL WHEN REQUEST TO FETCH DATA IS MADE
    builder.addCase(fetchAllCategoriesWithItems.pending, (state, action) => {
      state.allCategoriesWithItemsError = null
    })
    // SET DATA IF FETCH REQUEST IF FULFILLED
    builder.addCase(fetchAllCategoriesWithItems.fulfilled, (state, action) => {
      state.allCategoriesWithItems = action.payload
    })
    // SET ERROR IF FETCH REQUEST IS REJECTED
    builder.addCase(fetchAllCategoriesWithItems.rejected, (state, action) => {
      state.allCategoriesWithItemsError = action.error.message
    })
  }
});

export const { setAllCategoriesWithItems } = categoriesSlice.actions;
export default categoriesSlice.reducer;