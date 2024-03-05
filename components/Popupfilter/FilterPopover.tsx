import React from 'react';
import {
  Popover,
  Select,
  MenuItem,
  TextField,
  Button,
  Autocomplete,
  DialogActions,
} from '@mui/material';
// resolved the issues and made component reusable again
export interface FilterPopoverProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  selectedColumn: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  filters: any;
  setFilters:
    | React.Dispatch<React.SetStateAction<Record<any, any>>>
    | undefined;
  data: any[];
  applyFilter: () => void;
  setSelectedColumnValue?: React.Dispatch<React.SetStateAction<string>>;
  selectedColumnValue?: string;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  anchorEl,
  onClose,
  selectedColumn,
  selectedOption,
  setSelectedOption,
  filters,
  setFilters,
  data,
  applyFilter,
  setSelectedColumnValue,
  selectedColumnValue,
}) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div style={{ padding: '5px 10px 0', width: '250px' }}>
        {/* <Select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          fullWidth
          style={{ marginTop: '20px' }} 
        >
          <MenuItem value="start with"> Starts With</MenuItem>
          <MenuItem value="ends with"> Ends With</MenuItem>
          <MenuItem value="containes"> Contains With</MenuItem>
          <MenuItem value="option4"> Equals</MenuItem>
        </Select> */}

        {/* <Autocomplete
          options={[
            ...new Set(data?.map((option) => option[selectedColumn])),
          ].filter((option) => option !== undefined && option !== null)}
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              margin="dense"
              label={`Filter by ${selectedColumn}`}
              fullWidth
            />
          )}
          value={selectedColumn?filters[selectedColumn] : ''}
          onChange={(e, newValue) =>
            //  handleFilter(selectedColumn,newValue)
            setSelectedColumnValue && setSelectedColumnValue(newValue)          
          }
        /> */}

        <TextField
          autoFocus
          margin="dense"
          label={`Filter by ${selectedColumn}`}
          fullWidth
          value={selectedColumnValue}
          onChange={(e) =>
            //  handleFilter(selectedColumn,newValue)
            setSelectedColumnValue && setSelectedColumnValue(e.target.value)
          }
          size="small"
        />
      </div>
      <DialogActions sx={{ paddingTop: '0' }}>
        <Button onClick={onClose} className="button text-dark">
          {' '}
          Cancel
        </Button>
        <Button onClick={applyFilter} className="button text-dark">
          Apply
        </Button>
      </DialogActions>
    </Popover>
  );
};

export default FilterPopover;
