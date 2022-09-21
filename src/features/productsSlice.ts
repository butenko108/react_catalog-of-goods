import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types/Product'

export interface ProductsState {
  isLoading: boolean
  productsFS: Product[]
}

const initialState: ProductsState = {
  isLoading: false,
  productsFS: []
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.productsFS = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setProducts, setIsLoading } = productsSlice.actions

export default productsSlice.reducer
