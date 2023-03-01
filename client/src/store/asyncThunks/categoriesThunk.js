import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const fetchAllCategoriesWithItems = createAsyncThunk(
  'categories/fetchAllCategoriesWithItems',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERV}/api/category/allwithitems`)
    return response.data
  }
)