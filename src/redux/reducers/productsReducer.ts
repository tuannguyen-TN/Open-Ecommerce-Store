import { Product } from './../../types/Product'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ProductsReducerState } from '../../types/ProductsReducerState'
import { productsData } from '../../test/productsData'

export const initialProductsState: ProductsReducerState = {
  products: [],
  featuredProducts: productsData,
  loading: false,
  error: '',
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    sortProductsByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
      if (action.payload === 'asc') {
        state.products.sort((a, b) => a.price - b.price)
      } else {
        state.products.sort((a, b) => b.price - a.price)
      }
    },
    addFeaturedProduct: (state, action: PayloadAction<Product>) => {
      const foundIndex = state.featuredProducts.findIndex(
        (item: Product) => item.id === action.payload.id
      )
      if (foundIndex === -1) {
        state.featuredProducts.push(action.payload)
      }
    },
    removeFeaturedProduct: (state, action: PayloadAction<number>) => {
      const foundIndex = state.featuredProducts.findIndex(
        (item: Product) => item.id === action.payload
      )
      if (foundIndex > -1) {
        state.featuredProducts.splice(foundIndex, 1)
      }
    },
  },
})

const productsReducer = productsSlice.reducer
export const {
  sortProductsByPrice,
  addFeaturedProduct,
  removeFeaturedProduct,
} = productsSlice.actions
export default productsReducer
