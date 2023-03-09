import { createSlice } from "@reduxjs/toolkit";
import { fetchPendingCart, saveCart } from "../asyncThunks/cartThunk";

const initialState = {
  cart: null,
  cartError: null,
  addedItemIds: []
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
    setCartName: (state, action) => {
      state.cart.name = action.payload
    },
    setCartStatus: (state, action) => {
      state.cart.status = action.payload
    },
    toggleCartItemCompletion: (state, action) => {
      const { item, category } = action.payload;

      // loop through categories
      state.cart.categories.forEach((cartCategory, cartIndex) => {
        // if category of specified item is found
        if (cartCategory._id === category._id) {
          // loop through items in that category
          cartCategory.items.forEach((cartItem, itemIndex) => {
            // if item is found toggle its completion state
            if (cartItem._id === item._id) {
              cartItem.isChecked = !cartItem.isChecked
            }
          })

        }

      })
    },
    modifyAmountOrAddToCart: (state, action) => {
      const { item, category, toSub } = action.payload;

      if (state.cart === 'Empty') {
        // add to empty cart functionality
        state.cart = {
          categories: [
            {
              _id: category._id,
              name: category.name,
              items: [{
                amount: 1,
                isChecked: false,
                _id: item._id,
                name: item.name
              }]
            }
          ]
        }

        // state.addedItemIds = [...new Set([...state.addedItemIds,item._id])];
        state.addedItemIds = [...new Set([...state.addedItemIds, item._id])];
        // state.addedItemIds = [...state.addedItemIds, item._id]

      } else {
        // loop through categories if cart is not empty
        for (let cartCategory of state.cart.categories) {
          // if category of specified item is found
          if (cartCategory._id === category._id) {
            // loop through items in that category
            for (let cartItem of cartCategory.items) {
              // if item is found increment it
              if (cartItem._id === item._id) {
                if (toSub) {
                  if (cartItem.amount > 1)
                    cartItem.amount -= 1
                } else {
                  cartItem.amount += 1
                }

                return;
              }
            }

            // if item is not found
            // add that item to its category

            cartCategory.items = [
              ...cartCategory.items,
              {
                amount: 1,
                isChecked: false,
                _id: item._id,
                name: item.name
              }
            ];
            state.addedItemIds = [...new Set([...state.addedItemIds, item._id])];

            return;



          }
        }

        // add category and item if category is not found

        state.cart.categories = [
          ...state.cart.categories,
          {
            _id: category._id,
            name: category.name,
            items: [{
              amount: 1,
              isChecked: false,
              _id: item._id,
              name: item.name
            }]
          }
        ];

        state.addedItemIds = [...new Set([...state.addedItemIds, item._id])];

      }

    },
    deleteItemFromCart: (state, action) => {
      const { item, category } = action.payload;


      // loop through categories
      state.cart.categories.forEach((cartCategory, cartIndex) => {
        // if category of specified item is found
        if (cartCategory._id === category._id) {
          // loop through items in that category
          cartCategory.items.forEach((cartItem, itemIndex) => {
            // if item is found delte it
            if (cartItem._id === item._id) {
              // add delete functionality
              if (cartCategory.items.length === 1) {
                state.cart.categories.splice(cartIndex, 1);
              } else {
                cartCategory.items.splice(itemIndex, 1);
              }

              state.addedItemIds.forEach((itemId, itemIdIndex) => {
                if (itemId === item._id) {
                  state.addedItemIds.splice(itemIdIndex, 1)
                }
              })
            }
          })

        }

      })

    }
  },
  extraReducers: (builder) => {
    // SET ERROR TO NULL WHEN REQUEST TO FETCH DATA IS MADE
    builder.addCase(fetchPendingCart.pending, (state, action) => {
      state.cartError = null
    })
    // SET DATA IF FETCH REQUEST IS FULFILLED
    builder.addCase(fetchPendingCart.fulfilled, (state, action) => {
      state.cart = action.payload

      if (action.payload !== "Empty") {
        const itemIdsArray = []
        // loop through categories
        for (let cartCategory of action.payload.categories) {

          // loop through items in that category
          for (let cartItem of cartCategory.items) {
            itemIdsArray.push(cartItem._id)
            // state.addedItemIds = [...state.addedItemIds, cartItem._id]
          }

        }

        state.addedItemIds = [...new Set(itemIdsArray)];
      }


    })
    // SET ERROR IF FETCH REQUEST IS REJECTED
    builder.addCase(fetchPendingCart.rejected, (state, action) => {
      state.cartError = action.error.message
    })

    /**************************************************************************** */
    // SET ERROR TO NULL WHEN REQUEST TO SAVE CART IS MADE
    builder.addCase(saveCart.pending, (state, action) => {
      state.cartError = null
    })

    // SET DATA IF CART SAVE IS FULFILLED
    builder.addCase(saveCart.fulfilled, (state, action) => {


      if (action.payload) {
        state.cart = action.payload
        if (action.payload === "Empty") {
          state.cart = action.payload
          state.addedItemIds = []
        } else {
          const itemIdsArray = []
          // loop through categories
          for (let cartCategory of action.payload.categories) {

            // loop through items in that category
            for (let cartItem of cartCategory.items) {
              itemIdsArray.push(cartItem._id)
              // state.addedItemIds = [...state.addedItemIds, cartItem._id]
            }

          }

          state.addedItemIds = [...new Set(itemIdsArray)];
        }
      }


    })
    // SET ERROR IF CART SAVE IS REJECTED
    builder.addCase(saveCart.rejected, (state, action) => {
      state.cartError = action.error.message
    })
  }
});

export const { setCart, modifyAmountOrAddToCart, deleteItemFromCart, setCartName, setCartStatus, toggleCartItemCompletion } = cartSlice.actions;
export default cartSlice.reducer;