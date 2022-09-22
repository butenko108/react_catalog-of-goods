import * as React from 'react'
import Stack from '@mui/material/Stack'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Props {
  errMessage: string
  setErrMessage: (v: string) => void
}

export const Snackbars: React.FC<Props> = ({
  errMessage,
  setErrMessage
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Alert
        severity="error"
        onClose={() => setErrMessage('')}
      >
        {errMessage}
      </Alert>
      {/* <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  )
}
