import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddShoppingCartOutlined from '@mui/icons-material/AddShoppingCartOutlined'
import Box from '@mui/material/Box'
import { Product } from '../../types/Product'

interface Props {
  product: Product
}

export const GoodItem: React.FC<Props> = ({ product }) => {
  return (
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
  )
}
