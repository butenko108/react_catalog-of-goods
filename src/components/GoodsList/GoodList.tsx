import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AddShoppingCartOutlined from '@mui/icons-material/AddShoppingCartOutlined'
import { useAppSelector } from '../../app/hooks'
import { FilterTypes } from '../../types/FilterTypes'
import { CurrencyTypes } from '../../types/CurrencyTypes'
import { Product } from '../../types/Product'

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
          padding: '5px 5px 10px'
        }}
      >
        {preparedProducts().map(product => {
          return (
            <React.Fragment key={product.id}>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  lg={4}
                  xl={3}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        objectFit: 'contain',
                        padding: '10px 10px 0',
                        marginBottom: '30px'
                      }}
                    />
                    <Box
                      sx={{
                        padding: '0 15px'
                      }}
                    >
                      <Box
                        sx={{
                          marginBottom: '30px'
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="div" noWrap={true}>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: '1'
                          }}
                        >
                          {product.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '20px'
                        }}
                      >
                        <Typography gutterBottom variant="h6" component="div">
                          {`${product.price} ${product.currency}`}
                        </Typography>
                        <Button
                          size="small"
                          variant="contained"
                          endIcon={<AddShoppingCartOutlined />}
                        >
                          Buy
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
    </Box>
  )
}
