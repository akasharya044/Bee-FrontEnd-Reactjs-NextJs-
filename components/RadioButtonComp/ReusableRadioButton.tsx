import React from 'react';
import {Radio, FormControlLabel} from '@mui/material';

export interface ReusableRadioButtonProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  ariaLabel?: string;
}

const ReusableRadioButton: React.FC<ReusableRadioButtonProps> = ({
  checked,
  onChange,
  value,
  name,
  ariaLabel = '',
}) => {
  return (
    <>
    <FormControlLabel value={value} sx={{mr: '50px'}} control={
      <Radio
        checked={checked}
        onChange={onChange}
        // value={value}
        name={name}
        inputProps={{ 'aria-label': ariaLabel }}
        sx={{
          '&.Mui-checked': {
            color: '#2a2929',
        },}}
      />} label={name} />
      
    </>
  );
};

export default ReusableRadioButton;
