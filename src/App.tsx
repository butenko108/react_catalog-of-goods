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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Sort from './components/Sort'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Typography } from '@mui/material'

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
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-number"
                label="Цена от"
                type="number"
                defaultValue="0"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextField
                id="outlined-number"
                label="Цена до"
                type="number"
                defaultValue="29999"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="text" aria-label="text button group">
              <Button>UAH</Button>
              <Button>USD</Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Sort />
        </Grid>
      </Grid>
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
        <Grid item xs={4}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Название"
              />
              <TextField
                required
                id="outlined-number"
                label="Цена"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id="outlined-required"
                label="Описание"
                minRows={10}
                aria-label="minimum height"
                style={{ width: 400 }}
              />
              {/* <TextareaAutosize
                required
                id="outlined-required"
                aria-label="minimum height"
                minRows={3}
                placeholder="Minimum 3 rows"
                style={{ width: 200 }}
              /> */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                  Фотография
                  <input hidden accept="image/*" multiple type="file" required />
                </Button>
                <Button variant="contained">Добавить</Button>
              </Stack>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default App
