import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface inputProps {
  size?:number;
}

export const Loader = ({
  size,
}: inputProps) => {
  return (
    <Box className='commonLoader' sx={{ display: 'flex' }}>
      <CircularProgress size={size}/>
    </Box> 
  );
};

