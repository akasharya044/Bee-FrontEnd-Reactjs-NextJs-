

import React from 'react';
import { Autocomplete, Box, FormControl, TextField } from '@mui/material';
import { SxProps } from "@mui/system";

export interface NewSelectAutocompleteProps {
  options: Array<{ id: string; name: string }>;
  label: string;
  value: any
  onChange: (event: React.SyntheticEvent, value: any) => void;
  placeholder?: string;
  sx?: SxProps;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  className?: string;
  name?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface OptionType {
  id: string;
  name: string;
  // include any other properties that might be part of your option
}

const NewSelectAutocomplete: React.FC<NewSelectAutocompleteProps> = ({
  options,
  label,
  value,
  onChange,
  placeholder,
  required,
  helperText,
  error,
  className,
  name,
  onFocus,
  onBlur,
  sx,
}) => {
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <FormControl className='cust-form-control' fullWidth>        
        <Autocomplete
          multiple
          options={options}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          limitTags={3}
          getOptionLabel={(option: OptionType) => option?.name}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              required={required}
              helperText={helperText}
              error={error}
              className={className}
              name={name}
              variant="filled"
            />
          )}
          renderOption={(props, option: { id: string; name: string }) => (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          )}
        />
      </FormControl>
    </Box>
  );
};

export default NewSelectAutocomplete;


