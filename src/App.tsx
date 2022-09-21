import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import './App.css'
import { productsFS } from './api/productsFS.json'
import { setProducts, setIsLoading } from './features/productsSlice'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { Filters } from './components/Filters/Filters'
import { Loader } from './components/Loader/Loader'
import { GoodsList } from './components/GoodsList/GoodsList'
import { Form } from './components/Form/Form'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
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
      <Filters />
      <Grid container spacing={2}>
        {isLoading
          ? <Loader />
          : (<>
              <GoodsList />
              <Form />
            </>)
        }
      </Grid>
    </>
  )
}

export default App
