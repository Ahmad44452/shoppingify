import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const fetchPendingCart = createAsyncThunk(
  'cart/fetchPendingCart',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERV}/api/cart/lastpending`)
    return response.data
  }
)

export const saveCart = createAsyncThunk(
  'cart/saveCart',
  async (arg, { getState }) => {
    const cart = getState().cartSlice.cart;
    // console.log(arg)

    if (cart === "Empty" || cart.categories.length === 0)
      return null

    const items = [];
    // loop through categories
    cart.categories.forEach((cartCategory) => {
      // loop through items in that category
      cartCategory.items.forEach((cartItem) => {
        items.push({
          item: cartItem._id,
          amount: cartItem.amount,
          isChecked: cartItem.isChecked
        })
      })
    })

    const reqBody = {
      name: cart.name,
      status: cart.status || 'pending',
      items: items
    }

    if (cart._id)
      reqBody._id = cart._id

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERV}/api/cart/save`, reqBody)
    return response.data
  }
)