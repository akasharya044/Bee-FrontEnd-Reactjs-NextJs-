'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from '../MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography, Breadcrumbs } from '@mui/material';
import TableComp from '../TableComp';
import { ApiService } from '../../services/api.service';
import { GETVENDORLIST, genericGet,GETVENDERSEARCH } from '../../services/utils';
import { ListProps } from '../outlet';
import MainHeader from '../MainHeader';
import { Loader } from '../../../components/Loader/Loader';
import { FaBullseye } from 'react-icons/fa';

interface ApiResponse {
  data: {
    data: any; 
  };
}



const Vendor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();
  const handleClick = () => {
    router.push('/addVendor');
  };

  const deleteRow = (id: number) => {
  };

  const apiservice = new ApiService();

  useEffect(() => {    
    getData();
    setColumn([
      {
        id: 'code',
        name: 'Code',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'name',
        name: 'Vendor Name',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'activityId',
        name: 'Activity',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'legalEntityName',
        name: 'Legal Name',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'contactNumber',
        name: 'Contact No',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'emailAddress',
        name: 'Email Address',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'pocName',
        name: 'POC Name',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'pocContactNumber',
        name: 'POC Contact Num',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gstNumber',
        name: 'GST Number',
        isSort: false,
        isFilter: false,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'address',
        name: 'Billing Address',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gstRegisteredAddress',
        name: 'GST Registerd Address',
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
        id: 'actions',
        name: 'Actions',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
    ]);
  }, []);

  const getData = async () => {
    setIsLoading(true)
    try {
      const response:any = await genericGet({url:`${GETVENDORLIST}`});
      if(response.data){
        const newData = response?.data?.data?.list.map((item: any) => ({
          id: item.id,
          code: item.code,
          name: item.name,
          activityId: item.activities.map((val: { name: string }) => val.name).join(", "),
          // paymentTerm:item.paymentTerms.map((val:any)=>val.sfa),
          paymentTerm: item.paymentTerms.map((val: any) => ({
            sfa: val.sfa,
            days: val.days,
          })),
          pocContactNumber: item.pocContactNumber,
          legalEntityName: item.legalEntity,
          contactNumber: item.contactNumber,
          emailAddress: item.pocEmailAddress,
          pocName: item.pocName,
          pocContactNum: item.pocContactNumber,
          gstNumber: item.gstNumber,
          state: item.billingAddress ? item.billingAddress.state : '',
          address: item.billingAddress ? item.billingAddress.name : '',
          gstRegisteredAddress: item.gstRegisteredAddress
            ? item.gstRegisteredAddress.name
            : '',
          city: item.billingAddress ? item.billingAddress.city : '',
          country: item.billingAddress ? item.billingAddress.country : '',
          pincode: item.gstRegisteredAddress
            ? item.gstRegisteredAddress.pincode
            : '',
  
        }));
       
        setData(newData);
        setIsLoading(false)
      }
      
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  const searchFunction = async () => {
  
    try {
      if (searchInput) {
        const response=await genericGet({url:`${GETVENDERSEARCH}/${searchInput}`}) as ApiResponse
        // const response = await apiservice.fetchData(
        //   `http://4.224.102.99/hiveconnect/requestmanagement/vendors/filter/${searchInput}`
        // );
        const newData = response?.data?.data
        if (newData) {
          setData(newData);
        }
      } else {
        getData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searchInput === '') {
      getData();
    }
  }, [searchInput]);

  

  // searchFunction(searchInput);
  useEffect(() => {
    getData(); 
  }, [searchInput]); 

  

  const handlePatch = (vendorId: any) => {
    router.push(`/vendorUpdate/${vendorId}`);
  };

  return (
    <div>
      <MainLayout>
        <MainHeader
          pageTitle={'Vendor'}
          buttonLabel={'Add Vendor'}
          isAddButton={true}
          onButtonClick={handleClick}
        >
          <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
            <Link href="/dashboard" className="text-d-none">
              Home
            </Link>
            <Typography color="text.primary">Vendor Master</Typography>
          </Breadcrumbs>
        </MainHeader>
        {/* <Vendorcom /> */}
        {isLoading ? (<Loader />) : (
          <TableComp
          showDeleteIcon={false}
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
          searchFunction={searchFunction}
          // fetchData={getData}
          searchInput={searchInput}
          handlePatch={handlePatch}
          setData={setData}
           
        />
        )}
        
      </MainLayout>
    </div>
  );
};

export default Vendor;
