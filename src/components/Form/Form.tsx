import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import Axios from 'axios'
import { Product } from '../../types/Product'
import { CurrencyTypes } from '../../types/CurrencyTypes'
import { setProducts } from '../../features/productsSlice'
import { Snackbars } from '../Snackbars/Snackbars'

export const Form: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [errMessage, setErrMessage] = useState('')
  const dispatch = useAppDispatch()
  const { productsFS, currency } = useAppSelector(state => state.products)

  useEffect(() => {
    const timerId = setTimeout(() => (setErrMessage('')), 3000)

    return () => clearInterval(timerId)
  }, [errMessage])

  const clearForm = (): void => {
    setName('')
    setDescription('')
    setPrice(0)
    setImage(null)
  }

  const addProduct = (): void => {
    // if (image !== undefined) {
    //   return
    // }

    const cloudName = 'dxgimjf1j'
    const baseURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'gc3znj7g')

    Axios.post(
      baseURL,
      formData
    ).then(response => {
      const productsId = productsFS.map(product => product.id)
      const lastProductId = Math.max(...productsId)

      const newProduct: Product = {
        id: lastProductId + 1,
        name,
        price,
        image: response.data.url,
        description,
        currency: CurrencyTypes.UAH
      }

      const newProductsList = [...productsFS, newProduct]
      dispatch(setProducts(newProductsList))
      clearForm()
      // добавить функционал, который будет показывать сообщение о успешно добавленном товаре
    }).catch(() => (
      new Error('Error upload image on Cloudinary')
    ))
  }

  // const checkCorrectCurrency = (): void => {
  //   if (currency === CurrencyTypes.USD) {
  //     setErrMessage('You need to change currency on UAH!')
  //   } else {
  //     addProduct()
  //   }

  //   if (name === '' ||
  //    description === '' ||
  //    price === 0 ||
  //    image === '') {
  //     setErrMessage('All fields must be filled!')
  //   } else {
  //     addProduct()
  //   }
  // }

  return (
    <Grid item xs={4}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          addProduct()
        }}
      >
        <TextField
          id="outlined-required"
          label="Название"
          placeholder="Введите название товара"
          value={name}
          onChange={e => setName(e.target.value)}
          required
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
          value={price}
          onChange={e => setPrice(+e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Описание"
          // minRows={10}
          // aria-label="minimum height"
          // style={{ width: 400 }}
          placeholder="Введите описание товара"
          value={description}
          onChange={e => setDescription(e.target.value)}
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
              multiple
              type="file"
              required
              onChange={(e) => {
                if (e.target.files !== null) {
                  setImage(e.target.files[0])
                }
              }}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Добавить товар
          </Button>
        </Stack>
      </Box>

      {errMessage !== '' && (
        <Snackbars
          errMessage={errMessage}
          setErrMessage={setErrMessage}
        />
      )}
    </Grid>
  )
}
