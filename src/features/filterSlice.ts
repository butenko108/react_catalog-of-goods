import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FilterTypes } from '../types/FilterTypes'
import products from '../api/productsFS.json'

const { productsFS } = products
const allPrices = productsFS.map(product => +product.price)
const minPrice = Math.min(...allPrices)
const maxPrice = Math.max(...allPrices)

export interface FilterState {
  fromPrice: number
  toPrice: number
  status: FilterTypes
}

const initialState: FilterState = {
  fromPrice: minPrice,
  toPrice: maxPrice,
  status: FilterTypes.PriceAscending
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFromPrice: (state, action: PayloadAction<number>) => {
      state.fromPrice = action.payload
    },
    setToPrice: (state, action: PayloadAction<number>) => {
      state.toPrice = action.payload
    },
    setStatus: (state, action: PayloadAction<FilterTypes>) => {
      state.status = action.payload
    }
  }
})

export const { setFromPrice, setToPrice, setStatus } = filterSlice.actions

export default filterSlice.reducer
