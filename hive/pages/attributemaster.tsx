'use client';
import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/fonts.css';
import TableComp from './TableComp';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';
import { ApiService } from '../services/api.service';
import MainHeader from './MainHeader';
import {Loader} from '../../components/Loader/Loader'
export interface ListProps {
  id?: string;
  name?: string;
  isSort?: boolean;
  isFilter?: boolean;
  isFrozen?: boolean;
  isPinned?: boolean;
  isVisible?: boolean;
}
const Attribute = () => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  console.log('demo>??>', filters, searchInput);

  const apiservice = new ApiService();

  const searchFunction = async (searchInput: any) => {
    try {
      if (searchInput) {
        const response = await apiservice.fetchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/warehouses/filter/${searchInput}`
        );

        console.log('warehouse response', response);
        console.log('warehouse searchInput', searchInput);
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
    setLoading(true);
    const response = await apiservice.fetchData(
      'http://20.207.68.38/hiveconnect/configuration/attributes'
    );
    console.log('API Response:', response);

    // Transform the data here
    const newData = response?.data?.map((item: any) => ({
      ...item,
      // Join the names of the unitOfMeasurements into a string
      unitOfMeasurement: item.unitOfMeasurements.map((u: any) => u.name).join(', ')
    }));

    console.log('Mapped data:', newData);
    setData(newData);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
    setColumn([
      {
        id: 'name',
        name: 'Name',
        isSort: true,
        isFilter: true,
        isVisible: true,
      },
      {
        id: 'groupName',
        name: 'Grouping',
        isSort: true,
        isFilter: true,
        isVisible: true,
      },
      {
        id: 'description',
        name: 'Description',
        isSort: true,
        isFilter: true,
        isVisible: true,
      },
      {
        id: 'dataType',
        name: 'Data Type',
        isSort: true,
        isFilter: true,
        isVisible: true,
      },
      {
        id: 'unitOfMeasurement',
        name: ' Applicable Unit Measurement',
        isSort: true,
        isFilter: true,
        isVisible: true,
      },
      {
        id: 'applicableValues',
        name: 'Applicable Values',
        isSort: true,
        isFilter: true,
        isVisible: true,
      },
      {
        id: 'actions',
        name: 'Actions',
        isSort: false,
        isFilter: false,
        isVisible: true,
      },
    ]);
  }, []);
  const handleClick = () => {
    router.push('/attributeForm');
  };

  const handlePatch = (attributeId: string) => {
    sessionStorage.setItem('attributeId', attributeId);
    router.push(`/attributeUpdate/${attributeId}`);
  };
  

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  console.log('data', page, rowsPerPage, filters);
  return (
    <MainLayout>
      <MainHeader
        pageTitle={'Attribute'}
        buttonLabel={'Add Attribute'}
        isAddButton={true}
        onButtonClick={handleClick}
      >
        <Typography className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            <Typography component="span">Home </Typography>
          </Link>
          <Typography component="span"> / Attribute Master</Typography>
        </Typography>
      </MainHeader>
      <TableComp
        showDeleteIcon={false}
        loading={loading}
        data={data}
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
        searchInput={searchInput}
        handlePatch={handlePatch}
        searchFunction={searchFunction}
        setData={setData}
      />
    </MainLayout>
  );
};

export default Attribute;