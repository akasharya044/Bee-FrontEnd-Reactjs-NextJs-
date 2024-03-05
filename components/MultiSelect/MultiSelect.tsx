import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


 interface optionProps{
id:string,
name:string,

 }

interface ReusableSelectProps {
  label: string;
  options: optionProps[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled? : boolean;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({ label, options, value, onChange, disabled }) => {

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value: selectedValue },
    } = event;

    onChange(
      // On autofill we get a stringified value.
      typeof selectedValue === 'string' ? selectedValue.split(',') : selectedValue,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={value.indexOf(option.id) > -1} />
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ReusableSelect;