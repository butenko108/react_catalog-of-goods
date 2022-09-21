import { CurrencyTypes } from './CurrencyTypes'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  currency: CurrencyTypes
}
