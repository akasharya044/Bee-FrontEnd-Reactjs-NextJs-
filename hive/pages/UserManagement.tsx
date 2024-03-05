"use client"
import * as React from 'react';
import {memo} from 'react'
import Box from '@mui/material/Box';

import { FormControl, Grid, InputLabel, MenuItem, Tab, Tabs } from '@mui/material';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReusableSelect from '../../components/ReusableSelect/ReusableSelect';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const styleSpan = {
    
  };

  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          select: {
            '&:focus': {
              border: 'none'
            },
          },
        },
      },
    },
  });



const UserManagementComp =() => {
    const [value, setValue] = React.useState(0);
    const [createUser, setCreateUser] = React.useState('');
    const router = useRouter();


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      console.log('values',newValue)
    };

    const handleCreatUser = (event: SelectChangeEvent) => {
        setCreateUser(event.target.value);
        if(event.target.value == 'Creat'){
          router.push('/createUser');
        }
        console.log('user', event.target.value)
      };

  return (
    <Grid container style={{backgroundColor: 'blueviolet', height:'180px',position: 'sticky', top: '0px',padding:'15px', zIndex: 9, boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
        <Grid item lg={7} sx={{marginBottom:'-15px', position:'relative'}}>
                <p style={{fontSize:'14px', color:'white'}}>
                    <Link href='/dashboard' style={{textDecoration: 'none', color:'white'}}><span>Home</span></Link><Link href=''style={{textDecoration: 'none', color:"white"}}><span> / System Admin</span></Link> / User Management 
                </p>
            {/* <div style={{fontSize:'14px', color:'white'}}>Home/System Admin/User Management</div> */}
            <div style={{position: 'absolute', bottom: '45%', color:'white', fontSize: '28px', fontWeight: '500'}}>User Management</div>
            <Box sx={{position: 'absolute', bottom: '0px'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                <Tab label="All User"  sx={{backgroundColor: 'white',borderRadius: '8px 8px 0px 0px', textTransform: 'none'}}/>
                <Tab label="Blocked"  sx={{backgroundColor: 'white',borderRadius: '8px 8px 0px 0px', marginLeft: '5px', textTransform: 'none'}}/>
                </Tabs>
            </Box>
        </Grid>
        <Grid item lg={5} sx={{display: 'flex', justifyContent: 'end', alignItems:'center'}}>
            <ReusableSelect
                        label="Add User"
                        options={[{ label: 'Create User', value: 'Creat' }]}
                        value={createUser}
                        onChange={handleCreatUser}
                        IconComponent={(props) => (
                            <span {...props}>
                              <RiArrowDropDownLine style={{color:'white'}}/>
                            </span>
                          )}
                        sx={{
                            color: 'white',
                            backgroundColor: 'black',
                          }}
                    />
                    
        </Grid>
    </Grid>
  );
}
export default memo(UserManagementComp)