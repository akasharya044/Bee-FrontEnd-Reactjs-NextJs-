import React from 'react';
import { Tabs, Tab } from '@mui/material';

export interface CustomTabProps {
  labels: string[]; 
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const CustomTabs: React.FC<CustomTabProps> = ({ labels, value, onChange }) => {
  return (
    <Tabs value={value} onChange={onChange} className='dashtab-parent'>
      {labels.map((label, index) => (
        <Tab className='dashtabs' key={index} label={label} />
      ))}
    </Tabs>
  );
};

export default CustomTabs;
