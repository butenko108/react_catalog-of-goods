import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types/Product'
import { CurrencyTypes } from '../types/CurrencyTypes'

export interface ProductsState {
  isLoading: boolean
  productsFS: Product[]
  currency: CurrencyTypes
}

const initialState: ProductsState = {
  isLoading: false,
  productsFS: [],
  currency: CurrencyTypes.UAH
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
    },
    setCurrency: (state, action: PayloadAction<CurrencyTypes>) => {
      state.currency = action.payload
    }
  }
})

export const { setProducts, setIsLoading, setCurrency } = productsSlice.actions

export default productsSlice.reducer
