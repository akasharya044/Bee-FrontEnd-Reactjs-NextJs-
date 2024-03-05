
import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {Box} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// ... any other imports
// import { TablePaginationActionsProps } from '@mui/material';






interface PaginationProps {
  page: number | undefined;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  rowsPerPage: any;
  // Update the onRowsPerPageChange type to match SelectChangeEvent<number>
  onRowsPerPageChange: (event: SelectChangeEvent<any>) => void;
  totalCount: number;
}


interface TablePaginationActionsProps {
  count: number; // total number of rows
  page: number; // current page
  rowsPerPage: number; // number of rows per page
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void; // page change event handler
  // Include other props from Material-UI's TablePaginationActionsProps as needed
}

const PaginationActions: React.FC<TablePaginationActionsProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange
}) => {
  const lastPage = Math.ceil(count / rowsPerPage) - 1;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, lastPage);
  };



   // Calculate the range of rows being displayed
   const from = count === 0 ? 0 : page * rowsPerPage + 1;
   const to = Math.min(count, (page + 1) * rowsPerPage);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
      <FirstPageIcon />
    </IconButton>
    <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
      <KeyboardArrowLeft />
    </IconButton>
    {/* Page Count Label, centered between the arrow icons */}
    <span style={{ margin: '0 10px', textAlign: 'center', minWidth: 'fit-content' }}>
      {`${from}-${to} of ${count}`}
    </span>
    <IconButton
      onClick={handleNextButtonClick}
      disabled={page >= lastPage}
      aria-label="next page"
    >
      <KeyboardArrowRight />
    </IconButton>
    <IconButton
      onClick={handleLastPageButtonClick}
      disabled={page >= lastPage}
      aria-label="last page"
    >
      <LastPageIcon />
    </IconButton>
  </div>
  );
};




const Pagination: React.FC<PaginationProps> = ({
  page = 0,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalCount,
}) => {

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Your logic to handle the change
    const rowsPerPage = parseInt(event.target.value, 10);
    // ...rest of your logic
  };
  

  return (
    <Box className="page-length justifycenter">
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        // onRowsPerPageChange={onRowsPerPageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={PaginationActions}
        labelDisplayedRows={() => null} // Remove the label from the default location
        style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
        labelRowsPerPage="" // Hide the initial "Rows per page" label
      />
      {/* The dropdown before the pagination arrow icons has been removed */}
      
      {/* Keep the "Rows per page" section on the extreme right */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }} className='hide-sm'>
         <span style={{ margin: '0 8px' }}>Rows per page:</span>
         <Select
           value={rowsPerPage}
           onChange={onRowsPerPageChange}
           style={{ 
             // Add any additional styling here
           }}
           size="small"
         >
           {[5, 10, 15, 20].map((row) => (
             <MenuItem key={row} value={row}>{row}</MenuItem>
           ))}
         </Select>
      </Box>
    </Box>
  );
};

export default Pagination;