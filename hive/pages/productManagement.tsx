'use client';
import React from 'react';
import TableComp from './TableComp';
import MainLayout from './MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Grid, Typography } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import MainHeader from './MainHeader';

const productManagement = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const handleClick = () => {
    console.log('outlet');
    router.push('/productmanagment');
  };

  return (
    <div>
      <MainLayout>
        <>
          <Grid
            container
            className="outlet_header box_shadow"
            sx={{ borderRadius: '5px', marginBottom: '15px' }}
          >
            <Grid item lg={9} md={9}>
              <Typography className='breadcrumb-text'>
                <Link href="/dashboard" className="text-d-none">
                  <Typography component="span">Dashboard </Typography>
                </Link>{' '}
                / Product Management
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className="outlet_header box_shadow"
            sx={{ borderRadius: '5px', height: '100vh' }}
          >
            <Grid item xs={12}>
              <Typography className='breadcrumb-text'>
                <Link href="/dashboard" className="text-d-none">
                  <span>POSM</span>
                </Link>{' '}
                / Product Management
              </Typography>

              {/* Display your table component here */}
              {/* <TableComp /> */}
              <Grid container justifyContent="flex-end">
                <Grid item lg={3} md={3} sx={{ position: 'relative' }}>
                  <CustomButton
                    onClick={handleClick}
                    sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      position: 'absolute',
                      bottom: '-80px',
                      height: '50px',
                      right: '10px',
                      '&:hover': {
                        backgroundColor: '#ff6b00', // Change this to the desired hover color
                      },
                    }}
                  >
                    ADD PRODUCT
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      </MainLayout>
    </div>
  );
};

export default productManagement;
