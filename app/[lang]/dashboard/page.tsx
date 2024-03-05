//app\[lang]\dashboard\page.tsx
import React from 'react';
import Dashboard from '../../../hive/pages/dashboard';
import  VendorDashboard  from '../../../hive/pages/vendorDashboard';
import { Box } from '@mui/material';

const page = () => {
  const role =  (typeof window !== 'undefined') ? sessionStorage.getItem("role") : "Ops Manager";
  return (
    <Box>
         {  
         
         role == "Vendor" ?  <VendorDashboard />
                     : (
                      <Dashboard />
                    )}
      
    </Box>
  );
};

export default page;
