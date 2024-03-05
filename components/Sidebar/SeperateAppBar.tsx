import React, { FC } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar } from '../Sidebar/Sidebarheader';
import PublicIcon from '@mui/icons-material/Public';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Myaccount from './Myaccount';
import Logo from 'public/Logo';
import Image from 'next/image';
import hiveconnect from 'public/image/hiveconnect.svg';

import '../../hive/styles/appbar.scss';
interface SeperateAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  theme: any;
}
const SeperateAppBar: FC<SeperateAppBarProps> = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  theme, // Destructure theme from props
}) => {
  return (
    <>
      <AppBar
        className="header AppBar"
        position="fixed"
        open={open}
        sx={{ backgroundColor: '#7326d9' }}
        theme={theme} // Pass theme to AppBar
      >
        <Toolbar className="toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open === false ? handleDrawerOpen : handleDrawerClose}
            edge="start"
            sx={{ marginRight: {lg: 3, md: 2, sm: 1} }}
          >
            <MenuIcon sx={{ color: '#ffffff' }} />
          </IconButton>

          <Typography noWrap component="div" sx={{ display: 'flex' }} className='logo'>
            {/* <Logo />
            <div style={{ marginLeft: '-90px' }}> */}
              <Image
                src={hiveconnect}
                height={46}
                alt="Picture of the author"
              />
            {/* </div> */}
          </Typography>

          <Typography
            noWrap
            component="div"
            sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}
            className='icons-div'
          >
            <IconButton color="inherit">
              <HelpOutlineIcon />
            </IconButton>
            <IconButton color="inherit">
              <PublicIcon />
            </IconButton>
            <Myaccount />
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SeperateAppBar;
