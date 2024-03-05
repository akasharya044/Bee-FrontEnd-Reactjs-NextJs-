'use client';
import { Button, Grid, Stack } from '@mui/material';
import {} from '@mui/material';

import React, { useState } from 'react';

// import MainLayout from '../MainLayout';

// import VendorBasic from './vendorBasic';
// import VendorPayment from './vendorPayment';
// import VendorDocs from './vendorDocs';
// import VendorWarehouse from './vendorWarehouse';
const VendorForm = () => {
  const [showWarehouse, setWareHouse] = useState(false);

  const [buttonClicked, setButtonClicked] = useState('basic');
  return (
    // <MainLayout>
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '1rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '1rem',
      }}
    >
      <Grid item lg={2}>
        <Stack direction="column" spacing={4}>
          <Button
            onClick={() => setButtonClicked('basic')}
            style={{
              backgroundColor: buttonClicked === 'basic' ? 'gray' : 'white',
              color: buttonClicked === 'basic' ? 'white' : 'gray',
            }}
          >
            Basic
          </Button>
          <Button
            onClick={() => setButtonClicked('payment')}
            style={{
              backgroundColor: buttonClicked === 'payment' ? 'gray' : 'white',
              color: buttonClicked === 'payment' ? 'white' : 'gray',
            }}
          >
            Payment
          </Button>
          <Button
            onClick={() => setButtonClicked('docs')}
            style={{
              backgroundColor: buttonClicked === 'docs' ? 'gray' : 'white',
              color: buttonClicked === 'docs' ? 'white' : 'gray',
            }}
          >
            Documents
          </Button>
          {showWarehouse && (
            <Button
              onClick={() => setButtonClicked('warehouse')}
              style={{
                backgroundColor:
                  buttonClicked === 'warehouse' ? 'gray' : 'white',
                color: buttonClicked === 'warehouse' ? 'white' : 'gray',
              }}
            >
              WareHouse
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
    // </MainLayout>
  );
};

export default VendorForm;
