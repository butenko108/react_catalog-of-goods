import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useAppSelector } from '../../app/hooks'
import { FilterTypes } from '../../types/FilterTypes'
import { CurrencyTypes } from '../../types/CurrencyTypes'
import { Product } from '../../types/Product'
import { GoodItem } from '../GoodItem/GoodItem'

export const GoogList: React.FC = () => {
  const { fromPrice, toPrice, status } = useAppSelector(state => state.filter)
  const products = useAppSelector(state => state.products.productsFS)
  const currentCurrency = useAppSelector(state => state.products.currency)

  const preparedProducts = (): Product[] => {
    const productsByCurrency = products.map(product => {
      if (product.currency === CurrencyTypes.UAH &&
        currentCurrency === CurrencyTypes.USD) {
        const newPrice = Math.floor(product.price / 40)

        return {
          ...product,
          price: newPrice,
          currency: CurrencyTypes.USD
        }
      }

      if (product.currency === CurrencyTypes.USD &&
        currentCurrency === CurrencyTypes.UAH) {
        const newPrice = Math.floor(product.price * 40)

        return {
          ...product,
          price: newPrice,
          currency: CurrencyTypes.UAH
        }
      }

      return product
    })

    const productsByPrice = productsByCurrency.filter(({ price }) => {
      return price >= fromPrice && price <= toPrice
    })

    switch (status) {
      case FilterTypes.PriceAscending:
        return productsByPrice.sort((a, b) => a.price - b.price)

      case FilterTypes.PriceDescending:
        return productsByPrice.sort((a, b) => b.price - a.price)

      case FilterTypes.ByAlphabet:
        return productsByPrice.sort((a, b) => a.name.localeCompare(b.name))

      default:
        return productsByPrice
    }
  }

  return (
    <Box sx={{
      height: '700px',
      overflowY: 'scroll'
    }}>
      <Grid
        container
        spacing={3}
        sx={{
          padding: '5px 0px 5px'
        }}
      >
        {preparedProducts().map(product => {
          return (
            <Grid
              item
              xs={6}
              sm={4}
              lg={4}
              xl={3}
              key={product.id}
            >
              <GoodItem product={product} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
