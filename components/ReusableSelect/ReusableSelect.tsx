import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface SelectProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { label: string; value: string }[];
  disabled? : boolean;
  sx?:object;
  IconComponent?: React.ElementType;
  labelColor?: string;
  error?: boolean;
  helperText?: string | undefined;
}

const ReusableSelect: React.FC<SelectProps> = ({ label, value, onChange, options, disabled, sx, IconComponent, labelColor, error, helperText}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error}>
        <InputLabel id="demo-simple-select-label" sx={{ color: labelColor || 'white' }}>{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
          disabled={disabled}
          sx={sx}
          IconComponent={IconComponent}
          error={error}  
        >
          
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
       
      </FormControl>
    </Box>
  );
};

export default ReusableSelect;