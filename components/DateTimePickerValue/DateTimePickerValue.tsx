import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


 export interface DateTimePickerValueProps {
  initialValue: Date | null;
  onChange: (newValue: Date | null) => void;
  disabled?: boolean
}

const DateTimePickerValue: React.FC<DateTimePickerValueProps> = ({ initialValue, onChange, disabled }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Controlled picker"
          value={initialValue}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          disabled={disabled}
        />
    </LocalizationProvider>
  );
};

export default DateTimePickerValue;