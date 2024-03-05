import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, MenuItem, IconButton } from '@mui/material';
import { BiSortDown, BiSortUp, BiSort } from 'react-icons/bi';
import { BsFunnel } from 'react-icons/bs';
import CustomButton from '../../components/CustomButton/CustomButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export const data: Array<{ [key: string]: any }> = [
  // ... your data objects here
  {
    rId: 'RID - 12345',
    projectName: 'Media Player',
    projectType: 'Digital Name',
    productposm: 'OID 101',
    servicetype: 'Rajput Store',
    quantity: 'East',
    zone: 'Ajey Dhore',
    status: 'Ohio',
    subRows: [
      {
        rId: 'Status',
        projectName: 'Media Player',
        projectType: 'Digital Name',
        productposm: 'OID 101',
        servicetype: 'Rajput Store',
        quantity: 'East',
        zone: 'Ajey Dhore',
        status: 'Ohio',
      },
      {
        rId: 'Status',
        projectName: 'Media Player',
        projectType: 'Digital Name',
        productposm: 'OID 101',
        servicetype: 'Rajput Store',
        quantity: 'East',
        zone: 'Ajey Dhore',
        status: 'Ohio',
      },
    ],
  },
  {
    rId: 'RID - 12344',
    projectName: 'Media Player',
    projectType: 'Digital Name',
    productposm: 'OID 101',
    servicetype: 'Rajput Store',
    quantity: 'East',
    zone: 'Ajey Dhore',
    status: 'Ohio',
    subRows: [
      {
        rId: 'Status 1',
        projectName: 'Media Player',
        projectType: 'Digital Name',
        productposm: 'OID 101',
        servicetype: 'Rajput Store',
        quantity: 'East',
        zone: 'Ajey Dhore',
        status: 'Ohio',
      },
    ],
  },
  {
    rId: 'RID - 12343',
    projectName: 'Media Player',
    projectType: 'Digital Name',
    productposm: 'OID 101',
    servicetype: 'Rajput Store',
    quantity: 'East',
    zone: 'Ajey Dhore',
    status: 'Ohio',
    subRows: [
      {
        rId: 'Status 2',
        projectName: 'Media Player',
        projectType: 'Digital Name',
        productposm: 'OID 101',
        servicetype: 'Rajput Store',
        quantity: 'East',
        zone: 'Ajey Dhore',
        status: 'Ohio',
      },
    ],
  },
];

const custIcons = {
  ArrowDownwardIcon: (props: React.ComponentProps<typeof BiSortDown>) => (
    <BiSortDown {...props} />
  ),
  SortIcon: (props: React.ComponentProps<typeof BiSortUp>) => (
    <BiSortUp {...props} />
  ),
};

const ExpandTable: React.FC = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'rId',
        header: 'Request ID',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        // size: 'fit-content',
      },
      {
        accessorKey: 'projectName',
        header: 'Project Name',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        // size: 'fit-content',
      },
      {
        accessorKey: 'projectType',
        header: 'Project Type',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        // size: 'fit-content',
      },
      {
        accessorKey: 'productposm',
        header: 'Product (POSM)',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        size: 'fit-content',
      },
      {
        accessorKey: 'servicetype',
        header: 'Service Type',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        // size: 'fit-content',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        // size: 'fit-content',
      },
      {
        accessorKey: 'zone',
        header: 'Zone',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        // size: 'fit-content',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Header: ({ column }) => (
          <Box className="filter-icons-div">
            <IconButton onClick={() => alert('sorting')}>
              <BiSort />
            </IconButton>
            {column.columnDef.header}
            <IconButton onClick={() => alert('filter')}>
              <BsFunnel />
            </IconButton>
          </Box>
        ),
        // size: 'fit-content',
      },
    ],
    []
  );

  return (
    <Box className="expand-table cust-table position-relative">
      <CustomButton variant="outlined" className="button btn-clear">
        <FilterAltOutlinedIcon /> Clear
      </CustomButton>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableExpanding={false}
        enableExpandAll={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableEditing={false}
        enableRowSelection
        enableSelectAll={false}
        positionGlobalFilter="left"
        enableColumnFilters={false}
        enableColumnActions={false}
        enablePagination={true}
        enableFacetedValues
        enableFullScreenToggle={false}
        enableSorting={false}
        icons={custIcons}
        positionActionsColumn="last"
        enableRowActions
        renderRowActionMenuItems={({ row }) => [
          <MenuItem key="view" onClick={() => console.info('View Details')}>
            <RemoveRedEyeOutlinedIcon /> View Details
          </MenuItem>,
          <MenuItem key="select" onClick={() => console.info('Select Vendor')}>
            <EastOutlinedIcon /> Select Vendor
          </MenuItem>,
        ]}
        positionToolbarAlertBanner="none"
        initialState={{
          density: 'compact',
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

export default ExpandTable;
