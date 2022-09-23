import React, { useEffect } from 'react'
import './App.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { setIsLoading } from './features/productsSlice'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { Loader } from './components/Loader/Loader'
import { Catalog } from './components/Catalog/Catalog'
import { Form } from './components/Form/Form'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.products.isLoading)

  useEffect(() => {
    dispatch(setIsLoading(true))

    const timer = setTimeout(() => {
      dispatch(setIsLoading(false))
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading
        ? (
          <Box sx={{
            relative: 'relative'
          }}>
            <Loader />
          </Box>
          )
        : (
          <Grid container spacing={4} sx={{ padding: '10px' }}>
            <Grid item xs={9}>
              <Catalog />
            </Grid>
            <Grid item xs={3}>
              <Form />
            </Grid>
          </Grid>
          )}
    </>
  )
}

export default App
