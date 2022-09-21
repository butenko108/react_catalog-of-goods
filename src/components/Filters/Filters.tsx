import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setFromPrice, setToPrice, setStatus } from '../../features/filterSlice'
import { setCurrency } from '../../features/productsSlice'
import { FilterTypes } from '../../types/FilterTypes'
import { CurrencyTypes } from '../../types/CurrencyTypes'

export const Filters: React.FC = () => {
  const dispatch = useAppDispatch()
  const { fromPrice, toPrice, status } = useAppSelector(state => state.filter)
  // const { productsFS[0].currency } = useAppSelector(state => state.products.productsFS)
  // let currencyOneProduct: CurrencyTypes
  // if (productsFS && productsFS.length > 0) {
  //   currencyOneProduct = productsFS[0].currency
  //   console.log(currencyOneProduct)
  // }

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-number"
              label="Цена от"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              size="small"
              value={fromPrice}
              onChange={e => dispatch(setFromPrice(+e.target.value))}
            />
            <TextField
              id="outlined-number"
              label="Цена до"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              size="small"
              value={toPrice}
              onChange={e => dispatch(setToPrice(+e.target.value))}
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
              m: 1
            }
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              onClick={() => {
                // if (currencyOneProduct === CurrencyTypes.USD) {
                //   dispatch(setCurrency(CurrencyTypes.UAH))
                // }
                dispatch(setCurrency(CurrencyTypes.UAH))
              }}
            >
              UAH
            </Button>
            <Button
              onClick={() => {
                // if (currencyOneProduct === CurrencyTypes.UAH) {
                //   dispatch(setCurrency(CurrencyTypes.USD))
                // }
                dispatch(setCurrency(CurrencyTypes.USD))
              }}
            >
              USD
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            minWidth: 120
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={e => dispatch(setStatus(e.target.value as FilterTypes))}
              size="small"
              label="Сортировка"
            >
              <MenuItem value={FilterTypes.PriceAscending}>
                По возрастанию цены
              </MenuItem>
              <MenuItem value={FilterTypes.PriceDescending}>
                По убыванию цены
              </MenuItem>
              <MenuItem value={FilterTypes.ByAlphabet}>
                По алфавиту
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  )
}
