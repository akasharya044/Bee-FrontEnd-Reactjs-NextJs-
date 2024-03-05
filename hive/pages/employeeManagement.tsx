'use client';
import React, { useState, useEffect } from 'react';
import TableComp from './TableComp';
import MainLayout from './MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import { ApiService } from '../services/api.service';
import { ApiService1 } from '../services/api1.service';
import MainHeader from './MainHeader';
import { Alert, Breadcrumbs } from '@mui/material';

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

const EmployeeManagement = () => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patchData, setPatchData] = useState<string[]>([]);
  const [validationMessage, setValidationMessage] = useState('');


  const apiservice = new ApiService();
  const apiservice1 = new ApiService1();

  const fetchData = async () => {
    try {
     
      const response = await apiservice.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/clientemployee/client/employees'
      );
      

      const newData = response?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        contactNumber: item.contactNo,
        phone: item.contactNumber,
        code: item.code,
        designation: item?.designation,
        department: item?.department,
        stateId: item.address ? item.address.state.name : '',
        address: item.address ? item.address.name : '',
        city: item.address ? item.address.city : '',
        country: item.address ? item.address.country.name : '',
        pincode: item.address ? item.address.pincode : '',
      }));


      if (newData) {
        setData(newData);
        // alert(JSON.stringify(newData));
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchData();
    setColumn([
      {
        id: 'id',
        name: 'Id',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: false,
      },
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
        id: 'designation',
        name: 'Designation',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'department',
        name: 'Department',
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
        name: 'Email',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      // {
      //   id: 'address',
      //   name: 'Address',
      //   isSort: true,
      //   isFilter: true,
      //   isFrozen: false,
      //   isPinned: false,
      //   isVisible: true,
      // }
      
      {
        id: 'country',
        name: 'Country',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: false,
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
        id: 'stateId',
        name: 'State/County',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

   
      // {
      //   id: 'pincode',
      //   name: 'PinCode',
      //   isSort: true,
      //   isFilter: true,
      //   isFrozen: false,
      //   isPinned: false,
      //   isVisible: true,
      // },

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

  const handlePatch = (employeeId: any) => {
    router.push(`/employeeUpdate/${employeeId}`);
  };
  

  const handleClick = () => {
    
    router.push('/employeeForm');
  };

  const deleteRow = (id: number) => {
    
  };

  const searchFunction = async () => {
    try {
      if (searchInput.length >= 3) {
        const response = await apiservice.fetchData(
          `http://20.219.172.254/hiveconnect/accounts/clientemployee/filter/${searchInput}`
        );
  
        const newData = response?.data;
        if (newData && newData.length > 0) {
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

  
  return (
    <div>
      <MainLayout>
        <MainHeader pageTitle={'Employee'} buttonLabel={'Add Employee'} isAddButton={true} onButtonClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
            <Link href="/dashboard" className="text-d-none">
              Home
            </Link>
            <Typography color="text.primary">Employee Management</Typography>
          </Breadcrumbs>
        </MainHeader>
        
      {renderValidationMessage()}
      
        <TableComp
        
          showDeleteIcon={false}
          data={data}
          setData={setData}
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
          // setPatchData={setPatchData}
          searchFunction={searchFunction}
          searchInput={searchInput}
        />
        
      
      </MainLayout>
    </div>
  );
};

export default EmployeeManagement;
