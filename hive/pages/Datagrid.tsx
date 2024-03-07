'use Client';
import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import TableComp from './TableComp';
import MainHeader from './MainHeader';
import { ApiService } from '../services/api.service';
import { ListProps } from './outlet';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TableContainer from '@mui/material/TableContainer';
import router from 'next/router';
import { genericGet } from 'hive/services/utils';

interface ApiResponse {
  data: {
    data: any;
  };
}

const DataGrid = () => {
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [validationMessage, setValidationMessage] = useState('');
  const api = new ApiService();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      //const url = 'http://20.207.68.38/hiveconnect/configuration/products';
      const response: any = await genericGet({
        url: `http://20.207.68.38/hiveconnect/configuration/products`,
      });

      console.log('API Response:', response); // Log the response for debugging
      //const response = await api.fetchData(url);

      if (response.data) {
        const newData = response.data.data.list.map((item: any) => ({
          id: item.id,
          Name: item.name,
          code: item.code,
          desc: item.description,
          loadTime: item.loadTime,
          marketId: item.marketId,
          brand: item.brand,
          productGroupId: item.productGroupId,
          productcatname: item.productCategory.name,
          productDocuments: item.productDocuments
            ? Object.keys(item.productDocuments).length
            : 0,
          productAttributes: item.productAttributes
            ? Object.keys(item.productAttributes).length
            : 0,
          productWarranty: item.productWarranty
            ? Object.keys(item.productWarranty).length
            : 0,
          createdon: item.createdon
            ? Object.keys(item.createdon).length > 1
              ? `${new Date(item.createdon.date).toLocaleDateString()}`
              : undefined
            : undefined,
        }));
      
          setData(newData);
        
      }
    } catch (error) {
      console.log(error);
    }
  };








  useEffect(() => {
    fetchData();

    setColumn([
      // { id: 'id', name: 'Id', isSort: false, isFilter: false, isFrozen: true, isPinned: false, isVisible: true },

      {
        id: 'Name',
        name: 'Name',
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
        id: 'desc',
        name: 'Descriptions',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'loadTme',
        name: 'LoadTime',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'marketId',
        name: 'MarketId',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'brand',
        name: 'Brand',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'productGroupId',
        name: 'ProductGroupId',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'productcatname',
        name: 'ProductCategoryName',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'productDocuments',
        name: 'ProductDocuments',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'productAttributes',
        name: 'ProductAttributes',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'productWarranty',
        name: 'ProductWarranty',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'createdon',
        name: 'CreatedOn',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
    ]);
  }, []);

  const searchFunction = async () => {
    try {
      if (searchInput) {
      
        const response = (await genericGet({
          url: `http://20.207.68.38/hiveconnect/configuration/product/code/${searchInput}`,
        })) as ApiResponse;

        const newData = response?.data?.data;
        console.log(response?.data?.data);
        if (newData) {
          setData(newData);
          setValidationMessage('Validation');
        } else {
          setValidationMessage('else Validation');
          setData([]);
        }
      } else {
        fetchData();
        setData([]);
        setValidationMessage('Val');
      }
    } catch (error) {
      setValidationMessage('Check Console Error');
      console.log(error);
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
  }, [fetchData, searchInput]);

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

  const handlePatch = (rowId: any) => {
    router.push(`/warehouseUpdate/{$rowId}`);
  };

  return (
    <>
      <MainLayout>
        <MainHeader pageTitle={'Product Management'}>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="text-dark breadcrumb-text"
          >
            <Link href="/dashboard" className="text-d-none">
              Home
            </Link>
            <Typography color="text.primary">Product Master</Typography>
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
    </>
  );
};

export default DataGrid;
