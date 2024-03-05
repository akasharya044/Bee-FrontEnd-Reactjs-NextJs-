/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';

interface Vendor {
  id: string;
  name: string;
}

export interface AutocompleteProps {
  options: Vendor[];
  label: string;
  onSelect: (vendorId: string | null) => void;
}

const CustomAutocomplete: React.FC<AutocompleteProps> = ({ options, label, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Vendor | null>(null);

  const handleSelect = (event:any, newValue:any) => {
    setSelectedOption(newValue);
    if (newValue) {
      onSelect(newValue.id);
    } else {
      onSelect(null);
    }
  };

  return (
    <FormControl className='cust-form-control' fullWidth>
      <Autocomplete
        value={selectedOption}
        onChange={handleSelect}
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} variant='filled' label={label} />}
      />
    </FormControl>
  );
};

export default CustomAutocomplete;
