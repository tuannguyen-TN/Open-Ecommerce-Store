import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CartItem } from '../../types/CartItem'
import { Product } from '../../types/Product'

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const foundIndex = state.findIndex(
        (item: CartItem) => item.id === action.payload.id
      )
      if (foundIndex !== -1) {
        state[foundIndex].quantity += 1
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const foundIndex = state.findIndex(
        (item: CartItem) => item.id === action.payload
      )
      if (foundIndex !== -1) {
        state.splice(foundIndex, 1)
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const foundIndex = state.findIndex(
        (item: CartItem) => item.id === action.payload.id
      )
      if (foundIndex !== -1) {
        state[foundIndex].quantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      return initialState
    },
  },
})

const cartReducer = cartSlice.reducer
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions
export default cartReducer
