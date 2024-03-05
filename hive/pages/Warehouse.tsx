'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography, Box, Breadcrumbs, Alert } from '@mui/material';
import { ApiService } from '../services/api.service';
import TableComp from './TableComp';
import { ListProps } from './outlet';
import MainHeader from './MainHeader';
import { GETWHEREHOUSELIST, GETWHEREHOUSESEARCH, genericGet } from '../services/utils';


interface ApiResponse {
  data: {
    data: any;
  };
}

const Warehouse = () => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [validationMessage, setValidationMessage] = useState('');
  const apiservice = new ApiService();

  const fetchData = async () => {
    try {
      const response: any = await genericGet({ url: `${GETWHEREHOUSELIST}` });
      if (response.data) {
        const newData = response?.data?.data?.map((item: any) => ({
          id: item.id,
          name: item.name,
          emailAddress: item.emailAddress,
          code: item.code,
          contactName: item.contactName,
          contactNo: item.contactNo,
          country: item.address.country,
          city: item.address.city,
          wareHouseType: item.wareHouseType,
          legalName: item.legalName,
          vendors: item.vendors,
          state: item.address ? item.address.state : '',
          address: item.address ? item.address.name : '', // Update this line based on your new structure
          pincode: item.address ? item.address.pincode : '', // Update this line based on your new structure

        }));

        if (newData) {
          setData(newData);

        }
      }
    }
    catch (error) {

    }
  };

  useEffect(() => {
    fetchData();

    // Rest of your useEffect logic
    setColumn([
      // { id: 'id', name: 'Id', isSort: false, isFilter: false, isFrozen: true, isPinned: false, isVisible: true },
      {
        id: 'wareHouseType',
        name: 'WareHouse Type',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'name',
        name: 'WareHouse Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'code',
        name: 'Code',
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
        id: 'contactNo',
        name: 'Contact No',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'emailAddress',
        name: 'Email',
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
        id: 'city',
        name: 'City',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'pincode',
        name: 'Pincode',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

      {
        id: 'legalName',
        name: 'Legal Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

      {
        id: 'address',
        name: 'Address',
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

  const handlePatch = (rowId: any) => {
    router.push(`/warehouseUpdate/{$rowId}`);
  };

  const searchFunction = async () => {
    try {
      if (searchInput) {

        const response = await genericGet({ url: `${GETWHEREHOUSESEARCH}/${searchInput}` }) as ApiResponse

        const newData = response?.data?.data;
        if (newData) {
          setData(newData);
          setValidationMessage('');
        } else {

          setValidationMessage('Data not exists in table');
          setData([]);
        }
      } else {
        fetchData();
        setData([]);
        setValidationMessage('');
      }
    } catch (error) {

      setValidationMessage('Error fetching data');
    }
  };


  useEffect(() => {
    if (!searchInput) {
      setValidationMessage('');
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput === '') {
      fetchData();
    }
  }, [searchInput]);

  const renderValidationMessage = () => {
    if (validationMessage) {
      return (
        <Box sx={{ margin: '20px' }}>
          <Alert severity="warning">{validationMessage}</Alert>
        </Box>
      );
    }
    return null;
  };

  const handleClick = () => {
    router.push('/warehouseForm');
  };

  return (
    <MainLayout>
      <MainHeader pageTitle={'Warehouse'} buttonLabel={'Add Warehouse'} isAddButton={true} onButtonClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Typography color="text.primary">Warehouse Master</Typography>
        </Breadcrumbs>
      </MainHeader>
      {renderValidationMessage()}
      <TableComp
        data={data}
        setData={setData}
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
        handlePatch={handlePatch}
        searchFunction={searchFunction}
        searchInput={searchInput}
      />
    </MainLayout>


  );
};

export default Warehouse;
