import React from 'react'
import Stack from '@mui/material/Stack'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Props {
  successMessage: boolean
  setSuccessMessage: (v: boolean) => void
  errMessage: boolean
  setErrMessage: (v: boolean) => void
  filtersByPriceIsChanging: boolean
  setFiltersByPriceIsChanging: (v: boolean) => void
}

export const Alerts: React.FC<Props> = ({
  successMessage,
  setSuccessMessage,
  errMessage,
  setErrMessage,
  filtersByPriceIsChanging,
  setFiltersByPriceIsChanging
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {errMessage && (
        <Alert
          severity="error"
          onClose={() => setErrMessage(false)}
        >
          Фотография не загружена на сервер. Попробуйте перезагрузить страницу.
        </Alert>
      )}

      {successMessage && (
        <Alert
          severity="success"
          onClose={() => setSuccessMessage(false)}
        >
          Товар успешно добавлен в каталог
        </Alert>
      )}

      {filtersByPriceIsChanging && (
        <Alert
          severity="warning"
          onClose={() => setFiltersByPriceIsChanging(false)}
        >
          Если товары не будут отображаться в каталоге при изменении валюты, попробуйте поставить фильтр по цене от 0 (до 100 000...)
        </Alert>
      )}
    </Stack>
  )
}
