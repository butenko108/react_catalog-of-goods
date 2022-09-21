import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const ProductItem = () => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        Цена: 
        <TextField
          id="outlined-number"
          label="От"
          type="number"
          defaultValue="9999"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="outlined-number"
          label="До"
          type="number"
          defaultValue="9999"
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
    </Box>
  );
}
