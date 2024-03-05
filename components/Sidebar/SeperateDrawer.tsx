'use client';
import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DrawerHeader } from '../Sidebar/Sidebarheader';
import { Drawer } from '../Sidebar/Sidebarheader';
import { PiHouseLight } from "react-icons/pi";
import { TfiSave } from "react-icons/tfi"
import { CiDollar } from "react-icons/ci";
import { PiNotebook } from "react-icons/pi";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { TfiList } from "react-icons/tfi";
import { TfiHelpAlt } from "react-icons/tfi";
import { IoMenuOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

interface SeperateDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  theme: any;
}

export default function SeperateDrawer({
  open,
  handleDrawerClose,
  theme,
}: SeperateDrawerProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const sidebarData = [
    {
      icon: <PiHouseLight />,
      text: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <TfiSave style={{fontSize: '18px'}} />,
      text: 'Request',
    },
    {
      icon: <CiDollar />,
      text: 'Order',
      path: '/warehouse',
    },
    {
      icon: <PiNotebook />,
      text: 'Inventory',
      path: '/vendor',
    },
    {
      icon: <PiShoppingCartSimpleLight />,
      text: 'Asset',
    },
    {
      icon: <TfiList />,
      text: 'Finance',
    },
    {
      icon: <TfiHelpAlt style={{fontSize: '22px'}} />,
      text: 'Help Centre',
      path: '/outlet',
    },
    {
      icon: <IoMenuOutline />,
      text: 'Configuration',
      path: '/tabscomponent',
    }
  ];

  const [menuActive, setMenuActive] = useState('');

  return (
    <>
      <Drawer className="sidebar" variant="permanent" open={open} theme={theme}>
        <DrawerHeader />
        <Divider />
        <List className="List-menu-sidebar">
          {sidebarData.map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                className='menu-icon-btn'
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: '10.5px',
                }}
                disableRipple
                onClick={() => data.path && handleNavigation(data.path)}
              >
                <ListItemIcon
                  onClick={() => setMenuActive(data.text)}
                  className='menu-icon'
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: menuActive === data.text ? 'red' : 'gray',
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
