import React, { useEffect } from 'react'
import './App.css'
import type { RootState } from './app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './features/counterSlice'
import { setProducts, setIsLoading } from './features/productsSlice'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { productsFS } from './api/productsFS.json'
import { Loader } from './components/Loader/Loader'
import { GoodsList } from './components/GoodsList/GoodsList'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Sort from './components/Sort'
import Stack from '@mui/material/Stack'
import { useAppSelector } from './app/hooks'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const isLoading = useAppSelector(state => state.products.isLoading)

  useEffect(() => {
    dispatch(setIsLoading(true))

    const timer = setTimeout(() => {
      dispatch(setProducts(productsFS))
      dispatch(setIsLoading(false))
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
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
          {isLoading
            ? <Loader />
            : (
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <GoodsList />
              </Grid>)}
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
