import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import AddAPhotoOutlined from '@mui/icons-material/AddAPhotoOutlined'
import DoneOutlined from '@mui/icons-material/DoneOutlined'
import { LoadingButton } from '@mui/lab'
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
  const [price, setPrice] = useState(1000)
  const [image, setImage] = useState<File | null>(null)
  const [isErrName, setIsErrName] = useState(false)
  const [isErrDescription, setIsErrDescription] = useState(false)
  const [isErrPrice, setIsErrPrice] = useState(false)
  const [isErrImage, setIsErrImage] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [errMessage, setErrMessage] = useState(false)
  const [filtersByPriceIsChanging, setFiltersByPriceIsChanging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timerId = setTimeout(() => (setErrMessage(false)), 5000)

    return () => clearInterval(timerId)
  }, [errMessage])

  useEffect(() => {
    const timerId = setTimeout(() => (setSuccessMessage(false)), 5000)

    return () => clearInterval(timerId)
  }, [successMessage])

  useEffect(() => {
    setFiltersByPriceIsChanging(true)
    const timerId = setTimeout(() => (setFiltersByPriceIsChanging(false)), 10000)

    return () => clearInterval(timerId)
  }, [currency])

  const clearForm = (): void => {
    setName('')
    setDescription('')
    setPrice(1000)
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
    setIsLoading(true)
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
    )).finally(() => (
      setIsLoading(false)
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

  const changeColorImageButton = (): 'error' | 'success' | undefined => {
    if (isErrImage) {
      return 'error'
    }

    if (image !== null) {
      return 'success'
    }
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          marginBottom: '35px'
        }}
      >
        Добавление нового товара
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          validationForm()
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '40px'
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
          id="outlined-required"
          label="Описание"
          placeholder="Введите описание товара"
          value={description}
          onChange={e => {
            setDescription(e.target.value)
            setIsErrDescription(false)
          }}
          error={isErrDescription}
          helperText={isErrDescription && ('Заполните поле')}
        />
        <Button
          variant="contained"
          component="label"
          color={changeColorImageButton()}
          endIcon={image !== null ? (<DoneOutlined />) : (<AddAPhotoOutlined />)}
        >
          {image !== null ? ('Фото загружено') : ('Загрузить фото')}
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => {
              if (e.target.files !== null) {
                setImage(e.target.files[0])
                setIsErrImage(false)
              }
            }}
          />
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          loading={isLoading}
        >
          Добавить товар
        </LoadingButton>
      </Box>

      <Alerts
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errMessage={errMessage}
        setErrMessage={setErrMessage}
        filtersByPriceIsChanging={filtersByPriceIsChanging}
        setFiltersByPriceIsChanging={setFiltersByPriceIsChanging}
      />
    </>

  )
}
