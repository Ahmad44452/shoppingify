import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const fetchPendingCart = createAsyncThunk(
  'cart/fetchPendingCart',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERV}/api/cart/lastpending`)
    return response.data
  }
)