'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { memo } from 'react';
import { Typography, Box, Breadcrumbs } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from './MainLayout';
import Dashtabs from './Dashtabs';
import MainHeader from './MainHeader';
import { ListProps } from './outlet';
import { ApiService } from '../services/api.service';
import TableA from './TableA';
import { SelectChangeEvent } from '@mui/material/Select';


const styleSpan = {};

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            border: 'none',
          },
        },
      },
    },
  },
});

const Dashboard = (props:any) => {
  
  const [value, setValue] = React.useState(0);
  const [createUser, setCreateUser] = React.useState('');
  const router = useRouter();

  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [setTabs, setSetTabs] = useState<string>('All View');

  const apiservice = new ApiService();

  useEffect(() => {
    fetchData();

    // Rest of your useEffect logic
    setColumn([
      // { id: 'id', name: 'Id', isSort: false, isFilter: false, isFrozen: true, isPinned: false, isVisible: true },
      {
        id: 'requestId',
        name: 'Request ID',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'projectName',
        name: 'Project Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'projectTypeName',
        name: 'Project Type',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'posm',
        name: 'Product(POSM)',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'serviceType',
        name: 'Service Type',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'quantity',
        name: 'Quantity',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

      {
        id: 'zone',
        name: 'Zone',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'city',
        name: 'City',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tme',
        name: 'TME',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tse',
        name: 'TSE',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'asm',
        name: 'ASM',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'activity',
        name: 'Associated Activity',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'entityCode',
        name: 'Entity Code',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'outletName',
        name: 'Outlet Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'address',
        name: 'Outlet Address',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'vendors',
        name: 'Vendor Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'lifeCycleStages',
        name: 'Lifecycle Stage',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gpsLink',
        name: 'Status',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'actions',
        name: 'Actions',
        isSort: true,
        isFilter: true,
        isPinned: false,
        isVisible: true,
      },
    ]);
  }, []);

  const searchFunction = async (searchInput: any) => {
    try {
      if (searchInput) {
        const response = await apiservice.fetchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/outlets/filter/${searchInput}`
        );

        const newData = response?.data;
        if (newData) {
          setData(newData);
        }
      } else {
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiservice.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/dashboardrequestoutlet'
      );

      const newData = response?.data?.requestOutlets?.map((item: any) => ({
        id: item.id,
        requestId: item.requestId,
        projectTypeName: item.projectTypeName,
        projectName: item.projectName,
        quantity: item.requestDetails?.length || '-',
        requestDetails: item.requestDetails,
        projectId: item.projectId,
      }));
      if (newData) {
        setData(newData);
        // alert(JSON.stringify(newData)); // Show data in alert as JSON string
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately
    }
  };

  const fetchTabData = useCallback(
    async (tab: any) => {
      if (tab !== 'myToDo') {
        setData([]);
        return;
      }
      try {
        const response = await apiservice.fetchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/dashboardrequestoutlet?type=${tab}`
        );

        const newData = response?.data?.requestOutlets?.map((item: any) => ({
          id: item.id,
          requestId: item.requestId,
          projectTypeName: item.projectTypeName,
          projectName: item.projectName,
          quantity: item.requestDetails?.length || '-',
          requestDetails: item.requestDetails,
          projectId: item.projectId,
          projectTypeId: item.projectTypeId,
        }));

        console.log('function called>>>', newData);

        if (newData) {
          setData(newData);
          // alert(JSON.stringify(newData)); // Show data in alert as JSON string
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately
      }
    },
    [setTabs]
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log('values', newValue);
  };

  const handleCreatUser = (event: SelectChangeEvent) => {
    setCreateUser(event.target.value);
    if (event.target.value == 'Creat') {
      router.push('/createUser');
    }
    console.log('user', event.target.value);
  };

  const handleAllocation = (path: string) => {
    router.push(`/vendorAllocation/${path}`);
  };

  return (
    <MainLayout>
      <MainHeader pageTitle={'Dashboard'}>
        <Breadcrumbs
          aria-label="breadcrumb"
          className="text-dark breadcrumb-text"
        >
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </MainHeader>

      <Box className='dashboard-tabs-parent'>
        <Dashtabs
            setSetTabs={setSetTabs}
            setTabs={setTabs}
            fetchTabData={fetchTabData}
          >
          <TableA
            data={data}
            showDeleteIcon
            column2={column}
            setColumn2={setColumn}
            setSearchInput={setSearchInput}
            setSort={setSort}
            sort={sort}
            setFilters={setFilters}
            filters={filters}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            // deleteRow={deleteRow}
            // handlePatch={handlePatch}
            searchInput={searchInput}
            searchFunction={searchFunction}
            checkBox={true}
            isMore={true}
            handleAllocation={handleAllocation}
            localID="projectId"
          ></TableA>
        </Dashtabs>
      </Box>
    </MainLayout>
  );
};
export default Dashboard;
