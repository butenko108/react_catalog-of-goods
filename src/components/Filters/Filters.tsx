import React from 'react'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setFromPrice, setToPrice, setStatus } from '../../features/filterSlice'
import { setCurrency } from '../../features/productsSlice'
import { FilterTypes } from '../../types/FilterTypes'
import { CurrencyTypes } from '../../types/CurrencyTypes'

export const Filters: React.FC = () => {
  const dispatch = useAppDispatch()
  const { currency } = useAppSelector(state => state.products)
  const { fromPrice, toPrice, status } = useAppSelector(state => state.filter)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '30px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px'
        }}
      >
        <Box
        >
          <TextField
            id="fromPrice"
            label="Цена от"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            size="small"
            value={fromPrice}
            onChange={e => dispatch(setFromPrice(+e.target.value))}
            sx={{
              maxWidth: '150px'
            }}
          />
        </Box>
        <Box
        >
          <TextField
            id="toPrice"
            label="Цена до"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            size="small"
            value={toPrice}
            onChange={e => dispatch(setToPrice(+e.target.value))}
            sx={{
              maxWidth: '150px'
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px'
        }}
      >
        <Box
        >
          <FormControl fullWidth>
            <InputLabel id="currency">Валюта</InputLabel>
              <Select
                labelId="currency"
                label="Валюта"
                size="small"
                value={currency}
                onChange={e => dispatch(setCurrency(e.target.value as CurrencyTypes))}
              >
                <MenuItem value={CurrencyTypes.UAH}>UAH</MenuItem>
                <MenuItem value={CurrencyTypes.USD}>USD</MenuItem>
              </Select>
          </FormControl>
        </Box>
        <Box
        >
          <FormControl fullWidth>
            <InputLabel id="sorts">Сортировка</InputLabel>
            <Select
              labelId="sorts"
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
      </Box>
    </Box>
  )
}
