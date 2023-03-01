import { configureStore } from '@reduxjs/toolkit'

import loadingSlice from './slices/loadingSlice';
import categoriesSlice from './slices/categoriesSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    loadingSlice,
    categoriesSlice,
    cartSlice
  },
})