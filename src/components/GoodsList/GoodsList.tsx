import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useAppSelector } from '../../app/hooks'
// import { useAppSelector, useAppDispatch } from '../../app/hooks'
// import { setFromPrice, setToPrice } from '../../features/filterSlice'
import { FilterTypes } from '../../types/FilterTypes'
import { CurrencyTypes } from '../../types/CurrencyTypes'
import { Product } from '../../types/Product'

export const GoodsList: React.FC = () => {
  // const dispatch = useAppDispatch()
  const { fromPrice, toPrice, status } = useAppSelector(state => state.filter)
  const products = useAppSelector(state => state.products.productsFS)
  const currentCurrency = useAppSelector(state => state.products.currency)

  // const settingFiltersByPriceNewProduct = (productsList: Product[]): void => {
  //   const productsPrices = productsList.map(product => product.price)
  //   const maxPrice = Math.max(...productsPrices)
  //   const minPrice = Math.min(...productsPrices)

  //   if (maxPrice > toPrice) {
  //     dispatch(setToPrice(maxPrice))
  //   }

  //   if (minPrice < fromPrice) {
  //     dispatch(setFromPrice(minPrice))
  //   }
  // }

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

    // settingFiltersByPriceNewProduct(productsByCurrency)

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
    <Grid item xs={8}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
        {preparedProducts().map(product => {
          return (
            <Grid item xs={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" noWrap={true}>
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {`${product.price} ${product.currency}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap={true}>
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">Buy</Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}
