'use client';
import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/fonts.css';
import TableA from './TableA';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import { useRouter } from 'next/navigation';
import { Box, Typography, Breadcrumbs } from '@mui/material';
import { ApiService } from '../services/api.service';
import MainHeader from './MainHeader';

export interface ListProps {
  id?: string;
  name?: string;
  isSort?: boolean;
  isFilter?: boolean;
  isFrozen?: boolean;
  isPinned?: boolean;
  isVisible?: boolean;
  searchFunction?: any;
}

const Outlet = () => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const apiservice = new ApiService();
  const [showNoMatchPopup, setShowNoMatchPopup] = useState(false);

  
  console.log('demo>??>', filters, searchInput);

  // const getData = async () => {
  //   const headers = { tenant: "HC_1" };
  //   try {
  //     const response = await axios.get('http://20.192.10.19:806/hiveconnect/requestmanagement/outlet/outlets', { headers });
  //     console.log( 'datatatat',response.data.data)

  //     console.log("data response", newData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const convertAddressToText = (address: any) => {
    const addressText = Object.entries(address)
      .filter(
        ([key, value]) =>
          value !== '' &&
          key !== 'id' &&
          key !== 'modifiedOn' &&
          key !== 'modifiedBy' &&
          key !== 'isDeleted' &&
          key !== 'createdBy' &&
          key !== 'createdOn'
      )
      .map(([_, value]) => value)
      .join(', ');

    return addressText;
  };

  const fetchData = async () => {
    try {
      console.log('function called');
      const response = await apiservice.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/outlets'
      );

      const newData = response?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        lanCode: item.lanCode,
        email: item.emailAddress,
        contactNumber: item.contactNumber,
        contactName: item.contactName,
        phone: item.contactNumber,
        gpsCoordinates: item.gpsCoordinates,
        gpsLink: item.gpsLink,
        tseId: item.tse,
        tmeId: item.tme,
        asmId: item.asm,
        address: convertAddressToText(item.address),
        country: item.address.country,
        state: item.address.state,
        city: item.address.city,
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

  useEffect(() => {
    fetchData();

    // Rest of your useEffect logic
    setColumn([
      // { id: 'id', name: 'Id', isSort: false, isFilter: false, isFrozen: true, isPinned: false, isVisible: true },
      {
        id: 'name',
        name: 'Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'lanCode',
        name: 'Lan Code',
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
        id: 'city',
        name: 'City',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'country',
        name: 'Country',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'state',
        name: 'State',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

      {
        id: 'contactName',
        name: 'Contact Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'contactNumber',
        name: 'Contact Number',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'email',
        name: 'Contact Email address',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tseId',
        name: 'TSE Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tmeId',
        name: 'TME Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'asmId',
        name: 'ASM Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gpsCoordinates',
        name: 'GPS Coordinates',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gpsLink',
        name: 'GPS Link',
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

 

  const searchFunction = async () => {
    try {
      // Ensure search is initiated only if the searchInput length is >= 3
      if (searchInput.length >= 3) {
       
        const response = await apiservice.fetchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/outlets/filter/${searchInput}`
        );
  
        console.log('warehouse response', response);
        console.log('warehouse searchInput', searchInput);
        const newData = response?.data;
        if (newData) {
          setData(newData);
       
        }
      } else {
        // Optionally, reset to original data or handle as needed when search input is less than 3 characters
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handlePatch = (outletId: any) => {
    console.log("outletId",outletId)
    router.push(`/outletUpdate/${outletId}`);
  };

  const handleClick = () => {
    console.log('outlet');
    router.push('/outletForm');
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  console.log('data', page, rowsPerPage, filters);

  const handleSearchButtonClick = async () => {
    try {
      const response = await apiservice.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/outlets/outlet/filter/${searchInput}`
      );

      const newData = response?.data;

      if (newData) {
        setData(newData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <MainLayout>
      <MainHeader pageTitle={'Outlets'} buttonLabel={'Add Outlet'} isAddButton={true} onButtonClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Typography color="text.primary">Outlet Master</Typography>
        </Breadcrumbs>
      </MainHeader>
      <Box className="main-box page-padding-container">
    
        <TableA
          data={data}
          showDeleteIcon={false}
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
          deleteRow={deleteRow}
          handlePatch={handlePatch}
          searchInput={searchInput}
          searchFunction={searchFunction}
          fetchData={fetchData}
          gridName="Outlet"
          setData={setData}
          serialNo={true}
        />
      </Box>
    </MainLayout>
  );
};

export default Outlet;
