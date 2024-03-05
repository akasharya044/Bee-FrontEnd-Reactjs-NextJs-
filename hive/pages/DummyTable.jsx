import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, MenuItem } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    srNo: '1',
    name: 'Anshul',
    designation: 'Hive122',
    department: 'Test',
    contactnumber: '0909090909',
    email: 'anshul@gmail.com',
    city: 'meerut',
    country: 'Uganda',
    statecontry: 'MP',
    action: 'abc',
  },
  {
    srNo: '2',
    name: 'Jim',
    designation: 'Ops %$@!',
    department: 'drt',
    contactnumber: '2222222222',
    email: '2@gmail.com',
    city: 'meerut',
    country: 'Germany',
    statecontry: 'UK',
    action: 'abc',
  },
  {
    srNo: '3',
    name: 'omega',
    designation: 'ground crew',
    department: 'Department1',
    contactnumber: '123456786',
    email: 'AVC@gmail.com',
    city: 'Ciity',
    country: 'india',
    statecontry: 'UK',
    action: 'abc',
  },
  {
    srNo: '4',
    name: 'Hive@@',
    designation: 'Designationfg',
    department: '9175111',
    contactnumber: '123456786',
    email: 'admin@admin.in',
    city: 'New York',
    country: 'Russia',
    statecontry: 'MP',
    action: 'abc',
  },
  {
    srNo: '5',
    name: 'apurav',
    designation: 'Hive122',
    department: 'Department1',
    contactnumber: '77777777',
    email: 'za@gmail.com',
    city: 'Meerut',
    country: 'Nepal',
    statecontry: 'UK',
    action: 'abc',
  },
];

const DummyTable = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'srNo', //access nested data with dot notation
        header: 'Sr No',
        size: 'fit-content',
      },
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 'fit-content',
      },
      {
        accessorKey: 'designation',
        header: 'Designation',
        size: 'fit-content',
      },
      {
        accessorKey: 'department', //normal accessorKey
        header: 'Department',
        size: 'fit-content',
      },
      {
        accessorKey: 'contactnumber',
        header: 'Contact Number',
        size: 'fit-content',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 'fit-content',
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 'fit-content',
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 'fit-content',
      },
      {
        accessorKey: 'statecontry',
        header: 'State/Contry',
        size: 'fit-content',
      },
    //   {
    //     accessorKey: 'action',
    //     header: 'Action',
    //     size: 'fit-content',
    //   },
    ],
    [],
  );

  return (
    <Box sx={{position: 'relative'}}>
     <CustomButton variant="outlined" className="button btn-clear" sx={{position: 'absolute', zIndex: '10', width: 'fit-content', left: 'auto', top: '10px', right: '10px'}}>
        <FilterAltOutlinedIcon /> Clear
    </CustomButton>
    <MaterialReactTable columns={columns} data={data} 
        enableDensityToggle={false}
        enableEditing={false}
        positionGlobalFilter="left"enableExpanding={false}
        enableExpandAll={false}
        enableHiding={false}
        enableSelectAll={false}
        enableColumnFilters={false}
        enableColumnActions={true}
        enablePagination={true}
        enableFacetedValues
        enableFullScreenToggle={false}
        positionActionsColumn="last"
        enableRowActions
        renderRowActionMenuItems={({ row }) => [
            <MenuItem key="view" onClick={() => console.info('View Details')}>
              <RemoveRedEyeOutlinedIcon /> Edit
            </MenuItem>,
          ]}
        initialState={{
            showGlobalFilter: true,
        }}
        muiSearchTextFieldProps={{
            placeholder: 'Keyword Search',
            sx: { minWidth: '250px', maxWidth: '250px' },
            variant: 'outlined',
            size: 'small',
        }}
        muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 20],
            showFirstButton: true,
            showLastButton: true,
        }}
  />
  </Box>
  );
};

export default DummyTable;
