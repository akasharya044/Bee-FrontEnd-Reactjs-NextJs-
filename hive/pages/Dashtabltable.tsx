import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashtabltable() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="dashtabtable-parent" sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab 
            icon={<Radio name='tabs-selection' size="small" sx={{ '&.Mui-checked': { color: '#8a2be2'} }}/>}
            iconPosition='start'
            className='dashtabletabs'
            // label={<span>All View <span className="count">1</span></span>}
            label={<span>All View</span>}
            {...a11yProps(0)}
           />
          <Tab 
            icon={<Radio name='tabs-selection' size="small" sx={{ '&.Mui-checked': { color: '#8a2be2'} }}/>}
            iconPosition='start'
            className='dashtabletabs'
            // label={<span>Recce <span className="count">1</span></span>}
            label={<span>Recce</span>}
            {...a11yProps(1)} 
          />
          <Tab 
            icon={<Radio name='tabs-selection' size="small" sx={{ '&.Mui-checked': { color: '#8a2be2'} }}/>}
            iconPosition='start'
            className='dashtabletabs'
            // label={<span>3D Design <span className="count">1</span></span>}
            label={<span>3D Design</span>}
            {...a11yProps(2)} 
          />
          <Tab 
            icon={<Radio name='tabs-selection' size="small" sx={{ '&.Mui-checked': { color: '#8a2be2'} }}/>}
            iconPosition='start'
            className='dashtabletabs'
            // label={<span>Estimate <span className="count">1</span></span>}
            label={<span>Estimate</span>}
            {...a11yProps(3)}
          />
           <Tab 
            icon={<Radio name='tabs-selection' size="small" sx={{ '&.Mui-checked': { color: '#8a2be2'} }}/>}
            iconPosition='start'
            className='dashtabletabs'
            label={<span>Invoice</span>}
            {...a11yProps(4)} 
          />
           <Tab 
            icon={<Radio name='tabs-selection' size="small" sx={{ '&.Mui-checked': { color: '#8a2be2'} }}/>}
            iconPosition='start'
            className='dashtabletabs'
            // label={<span>Installation <span className="count">1</span></span>}
            label={<span>Installation</span>}
            {...a11yProps(5)} 
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}