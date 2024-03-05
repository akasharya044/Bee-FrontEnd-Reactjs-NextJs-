import React from 'react';
import {TextField, Box, FormControl} from '@mui/material';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SxProps } from '@mui/material';

export interface NewSelectOptionProps {
  options: Array<{ value: string; label: string }>;
  // label: string;
  label?: React.ReactNode
  value: string | string[]; // Controlled value
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
  SelectProps?: Partial<MuiSelectProps>;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?:string;
   displayEmpty?:String,
  disabled?: boolean | undefined;
  renderValue?: any;
  sx?: SxProps;
  required?: boolean;
  error?: boolean;
  // hidden:boolean,
  className?: string; // Additional className prop for styling
  // Any other props for TextField can be added here
  size?: any;
  variant?: any;
}

const NewSelectOption: React.FC<NewSelectOptionProps> = ({
  options,
  label,
  value,
  onChange,
  id = 'outlined-select-field',
  name = 'select-field',
  style,
  className,
  displayEmpty,
  placeholder,
  SelectProps,
  disabled,
  // hidden,
  required,
  helperText,
  error,
  onBlur,
  onFocus,
  size,
  variant,
  ...otherProps // Capture any other additional props
}) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {  width: ' 100%', ...style },        
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth className='cust-form-control'>
        <TextField
          id={id}
          select
          label={label}
          value={value}
          size={size}
          // placeholder={placeholder}
          onChange={onChange}
          name={name}
          className={className}
          disabled={disabled}
          // hidden={hidden}
          error={error}
          required={required}
          helperText={helperText}
          onFocus={onFocus}
          onBlur={onBlur}
          // sx={{color:'red'}}
          variant={variant ? variant : "filled"}
          // SelectProps={{
          //   displayEmpty: true,
          //   ...otherProps, // ensure any additional SelectProps are included
          // }}
          {...otherProps} // Spread any additional props here
        >
          {placeholder && <MenuItem value="" disabled >{placeholder}</MenuItem>}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
};

export default NewSelectOption;
