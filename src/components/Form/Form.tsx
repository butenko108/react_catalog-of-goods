import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import Axios from 'axios'
import { Product } from '../../types/Product'
import { setProducts } from '../../features/productsSlice'
import { setFromPrice, setToPrice } from '../../features/filterSlice'
import { Alerts } from '../Alerts/Alerts'

export const Form: React.FC = () => {
  const dispatch = useAppDispatch()
  const { productsFS, currency } = useAppSelector(state => state.products)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [isErrName, setIsErrName] = useState(false)
  const [isErrDescription, setIsErrDescription] = useState(false)
  const [isErrPrice, setIsErrPrice] = useState(false)
  const [isErrImage, setIsErrImage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [errMessage, setErrMessage] = useState(false)

  useEffect(() => {
    const timerId = setTimeout(() => (setErrMessage(false)), 3000)

    return () => clearInterval(timerId)
  }, [errMessage])

  useEffect(() => {
    const timerId = setTimeout(() => (setSuccessMessage(false)), 5000)

    return () => clearInterval(timerId)
  }, [successMessage])

  const clearForm = (): void => {
    setName('')
    setDescription('')
    setPrice(0)
    setImage(null)
  }

  const settingFiltersByPriceNewProduct = (): void => {
    const productsPrices = productsFS.map(product => product.price)
    const maxPrice = Math.max(...productsPrices)
    const minPrice = Math.min(...productsPrices)

    if (price > maxPrice) {
      dispatch(setToPrice(price))
    }

    if (price < minPrice) {
      dispatch(setFromPrice(price))
    }
  }

  const addProduct = (): void => {
    if (image === null) {
      return
    }

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
        currency
      }

      const newProductsList = [...productsFS, newProduct]
      dispatch(setProducts(newProductsList))
      settingFiltersByPriceNewProduct()
      clearForm()
      setSuccessMessage(true)
    }).catch(() => (
      setErrMessage(true)
    ))
  }

  const validationForm = (): void => {
    if (name === '') {
      setIsErrName(true)
    }

    if (description === '') {
      setIsErrDescription(true)
    }

    if (price <= 0) {
      setIsErrPrice(true)
    }

    if (image === null) {
      setIsErrImage(true)
    }

    if (isErrName ||
    isErrDescription ||
    isErrPrice ||
    isErrImage) {
      return
    }

    addProduct()
  }

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
          validationForm()
        }}
      >
        <TextField
          id="outlined-required"
          label="Название"
          placeholder="Введите название товара"
          value={name}
          onChange={e => {
            setName(e.target.value)
            setIsErrName(false)
          }}
            error={isErrName}
            helperText={isErrName && ('Заполните поле')}
        />
        <TextField
          required
          id="outlined-number"
          label="Цена"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="0"
          value={price}
          onChange={e => {
            setPrice(+e.target.value)

            if (+e.target.value > 0) {
              setIsErrPrice(false)
            }
          }}
          error={isErrPrice}
          helperText={isErrPrice && ('Укажите цену > 0')}
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
          onChange={e => {
            setDescription(e.target.value)
            setIsErrDescription(false)
          }}
          error={isErrDescription}
          helperText={isErrDescription && ('Заполните поле')}
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
          <Button
            variant="contained"
            component="label"
            // color="error"
            color={isErrImage ? ('error') : (undefined)}
          >
            Загрузить фото
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              required
              onChange={(e) => {
                if (e.target.files !== null) {
                  setImage(e.target.files[0])
                  setIsErrImage(false)
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

      <Alerts
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errMessage={errMessage}
        setErrMessage={setErrMessage}
      />
    </Grid>
  )
}
