"use client"

import React from 'react';
import Sidebarheader from '../../components/Sidebar/Sidebarheader';
import {Main} from '../../components/Sidebar/Sidebarheader'
import { useTheme } from '@mui/material';
import OidcAuth from '../services/OidcAuth';

const MainLayout = ({children}:any) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);
  return (
    
        <Sidebarheader>
        <Main theme={theme} className="main-content" open={open}> 
          {children}
        </Main>
        </Sidebarheader>
   
  )
}

export default MainLayout;