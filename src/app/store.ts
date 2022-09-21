import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import productsSlice from '../features/productsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch