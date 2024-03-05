import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { SxProps } from "@mui/system";

export interface NewSelectOptionProps {
  options: Array<{ id: string; name: string }>;
  label?: React.ReactNode;
  value: string[]; // Controlled value as an array for multi-select
  helperText?: string;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void; 
  id?: string;
  name?: string;
  style?: React.CSSProperties;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  sx?: SxProps;
  required?: boolean;
  error?: boolean;
  className?: string; // Additional className prop for styling
}

const NewMultiSelectOption: React.FC<NewSelectOptionProps> = ({
  options,
  label,
  value,
  onChange,
  id = 'outlined-select-field',
  name = 'select-field',
  style,
  className,
  placeholder,
  required,
  helperText,
  error,
  onBlur,
  onFocus,
  
  ...otherProps // Capture any other additional props
}) => {

  
  return (
    <Box
      component="form"
      sx={{
        '& .MuiFormControl-root': { width: '100%', ...style },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth className='cust-form-control' variant="filled">
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          value={value}
          multiple // Enable multiple selection
          onChange={onChange}
          name={name}
          className={className}
          error={error}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
          notched={true}
          // renderValue={
          //   value.length === 0
          //     ? () => <>{placeholder}</>
          //     : undefined
          // }
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NewMultiSelectOption;




