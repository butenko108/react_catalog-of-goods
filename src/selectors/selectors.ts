import { RootState } from '../app/store'
import { ProductsState } from '../features/productsSlice'

const productsSelector = (state: RootState): ProductsState => state.products

export const SELECTORS = {
  productsSelector
}
