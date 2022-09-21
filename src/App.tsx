import React from 'react'
import './App.css'
import type { RootState } from './app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './features/counterSlice'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { products } from './api/products.json'
import { Product } from './types/product'
import { ProductItem } from './components/card/ProductItem'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

export const App: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
      <ProductItem />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {products.map((product: Product) => {
                return (
                  <Grid item xs={4} key={product.id}>
                    <Item >
                      {product.name}
                    </Item>
                  </Grid>
                )
              })}
          </Grid>
        </Grid>
        {/* <Grid item xs={8}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4} key={product.id}>
              <Item >
                <ProductItem />
              </Item>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </>
  )
}

export default App
