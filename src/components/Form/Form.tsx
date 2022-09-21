import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useAppSelector, useAppDispatch } from './app/hooks'

export const Form: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  return (
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
            placeholder="Введите название товара"
          />
          <TextField
            required
            id="outlined-number"
            label="Цена, UAH"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            placeholder="0"
          />
          <TextField
            required
            id="outlined-required"
            label="Описание"
            minRows={10}
            aria-label="minimum height"
            style={{ width: 400 }}
            placeholder="Введите описание товара"
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
              <input
                hidden
                accept="image/*"
                multiple type="file"
                required
              />
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              Добавить товар
            </Button>
          </Stack>
        </div>
      </Box>
    </Grid>
  )
}
