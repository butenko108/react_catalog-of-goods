import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddShoppingCartOutlined from '@mui/icons-material/AddShoppingCartOutlined'
import Box from '@mui/material/Box'
import { Product } from '../../types/Product'
import { CurrencyTypes } from '../../types/CurrencyTypes'

interface Props {
  product: Product
}

export const GoodItem: React.FC<Props> = ({ product }) => {
  const changeIconCurrency = (
    currency: CurrencyTypes
  ): string => {
    switch (currency) {
      case CurrencyTypes.UAH:
        return '₴'

      case CurrencyTypes.USD:
        return '$'

      default:
        return ''
    }
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="135"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: 'contain',
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
          <Typography gutterBottom variant="subtitle2" component="div" noWrap={true}>
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
            {`${product.price}${changeIconCurrency(product.currency as CurrencyTypes)}`}
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
  )
}
