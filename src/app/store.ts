import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/productsSlice'
import filterSlice from '../features/filterSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    filter: filterSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
