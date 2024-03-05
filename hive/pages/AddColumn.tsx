import React, { useState, MouseEvent } from 'react';
import { Button, Checkbox, FormControlLabel, Popover } from '@mui/material';

interface Column {
  id: string; // Adjust the type as per your requirement
  name: string; // Adjust the type as per your requirement
}

interface ColumnSelectorProps {
  columns: Column[];
  columnVisibility: Record<string, boolean>; // Adjust the key type as per your requirement
  handleColumnVisibilityChange: (columnId: string) => void; // Adjust the parameter type as per your requirement
  disable: boolean;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ 
  columns, 
  columnVisibility, 
  handleColumnVisibilityChange,
  disable 
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openColumnSelector = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeColumnSelector = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button 
        style={{ float: 'right', marginTop: '20px' }} 
        variant="contained" 
        onClick={openColumnSelector}
        disabled={disable}
      >
        Show Columns
      </Button>
      
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeColumnSelector}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
          {columns.map((column) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={columnVisibility[column.id]}
                  onChange={() => handleColumnVisibilityChange(column.id)}
                />
              }
              label={column.name}
              key={column.id}
            />
          ))}
        </div>
      </Popover>
    </>
  );
};

export default ColumnSelector;
