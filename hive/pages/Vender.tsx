'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TableComp from './TableComp';
import { ApiService } from '../services/api.service';
import { ListProps } from './outlet';
import MainHeader from './MainHeader';

const Vendor = () => {
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const handleClick = () => {
    console.log('vendor');
    router.push('/addVendor');
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const apiservice = new ApiService();
        const response = await apiservice.fetchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/vendors`
        );
        console.log('response data vendor', response);

        const newData = response?.data?.list.map((item: any) => ({
          id: item.id,
          code: item.code,
          name: item.name,
          activityId: item.activityId,
          pocContactNumber: item.pocContactNumber,
          legalEntityName: item.legalEntity,
          contactNumber: item.contactNumber,
          emailAddress: item.pocEmailAddress,
          pocName: item.pocName,
          pocContactNum: item.pocContactNumber,
          gstNumber: item.gstNumber,
          stateId: item.billingAddress ? item.billingAddress.state : '',
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

        console.log('data response before', newData);
        setData(newData);
        console.log('data response', newData);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
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
        name: 'Name',
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
        name: 'Legal Entity Name',
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
        name: 'POC Contact Number',
        isSort: true,
        isFilter: true,
        isFrozen: true,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gstNumber',
        name: 'GST No',
        isSort: false,
        isFilter: false,
        isFrozen: true,
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
        id: 'address',
        name: 'Billing Address',
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
        name: 'State/Country',
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

  const handlePatch = (rowId: any) => {
    console.log('vender', rowId);
    sessionStorage.setItem('vendorId', rowId);
    router.push('/vendorForm');
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
          <Typography className="text-dark breadcrumb-text">
            <Link href="/dashboard" className="text-d-none">
              <Typography component="span">Home </Typography>
            </Link>
            <Typography component="span"> / Vendor Master</Typography>
          </Typography>
        </MainHeader>
        {/* <Vendorcom /> */}
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
          handlePatch={handlePatch}
          setData={undefined}
          
        />
      </MainLayout>
    </div>
  );
};

export default Vendor;
