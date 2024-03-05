import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CiSearch } from 'react-icons/ci';
import { FiSearch } from 'react-icons/fi';
import InputAdornment from '@mui/material/InputAdornment';
import { ApiService } from '../services/api.service';
import { useState, useEffect } from 'react';
import { FormControl, IconButton } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

export interface SearchFieldProps {
  isdisabled?: boolean;
  onSearch: (value: string) => void;
  searchInput?: string;
  searchFunction?: any;
}
const BasicTextFields: React.FC<SearchFieldProps> = ({
  onSearch,
  isdisabled,
  searchInput,
  searchFunction,
}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { maxWidth: '250px', width: '100%', pr: '10px' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <TextField
          id="standard-basic"
          placeholder="Keyword Search"
          variant="outlined"
          size="small"
          sx={{ backgroundColor: '#ffffff' }}
          value={searchInput}
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ArrowRightAltOutlinedIcon
                    onClick={() => searchFunction()}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={false}
        />
      </FormControl>
    </Box>
  );
};
export default BasicTextFields;
