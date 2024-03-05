import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button, Box, Typography } from '@mui/material';
import {getDictionary} from '../../getDictionary';
import {useParams} from '../../app/[lang]/ParamContext';
import {useEffect} from 'react';

interface DatepickerComponentProps {
  onSearch: (fromDate: Date | null, toDate: Date | null) => void;
  disabled: boolean;
}

const Datepickercomponent: React.FC<DatepickerComponentProps> = ({ onSearch, disabled }) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const params = useParams();
  const [lang, setLang] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);


  const handleSearchClick = () => {
    onSearch(fromDate, toDate);
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getDictionary(params.lang);
      setLang(result);  
      setIsLoading(false);
    };
  
    fetchData();
  }, [params.lang]);
console.log(lang,"lang");


  return (
    <Box className='date-range-parent'>
      <Box className='date-range-input-parent'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker 
          label={lang ? lang.form.From: 'Loading...'} 
          value={fromDate} 
          onChange={(date) => setFromDate(date)}  // Corrected this line
          disabled={disabled}
        />
      </LocalizationProvider>
        <Typography component='span'>-</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker 
          label={lang ? lang.form.To: 'Loading...'}
          value={toDate} 
          onChange={(date) => setToDate(date)}  // Corrected this line
          disabled={disabled}
        />
      </LocalizationProvider>
      </Box>
      <Box>
        <Button className='btn' variant='contained' onClick={handleSearchClick}>{lang ? lang.form.search: 'Loading...'}</Button>
      </Box>
    </Box>
  );
}

export default Datepickercomponent;
