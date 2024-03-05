'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Link, Typography, Breadcrumbs, Button } from '@mui/material';
import CustomButton from '../../../components/CustomButton/CustomButton';
import TableComp from '../TableComp';
import { ApiService } from '../../services/api.service';
import { useRouter } from 'next/navigation';
import { ListProps } from '../outlet';
import MainHeader from '../MainHeader'; 
import TableA from '../TableA';
interface ProductcatlistProps {
  categoryId: string;
}

const ProductListView: React.FC<ProductcatlistProps> = ({ categoryId }) => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const apiservice = new ApiService();

  const handleClick = () => {
    sessionStorage.setItem('catyId', categoryId);
    router.push(`/productForm`);
    console.log('catId', categoryId);
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };
  const searchFunction = async () => {
    
    try {
      if (searchInput) {
    
        const response = await apiservice.fetchData(
          `http://20.207.68.38/hiveconnect/configuration/product/code/${searchInput}`
         
        );

        
        
        const newData = response?.data;
        if (newData) {
          setData(newData);
          
        }
        console.log("product search:",newData)
      } else {
        fetchProductData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchProductData = async () => {
    try {
      const baseUrl = 'http://20.207.68.38';
      const endpoint = `/hiveconnect/configuration/product/category/${categoryId}`;
      const fullUrl = baseUrl + endpoint;
      const response = await apiservice.fetchData(fullUrl);
      console.log('API Response:', response); // Log the entire response

      if (response.statusCode === 200 && response.data) {
        setData(response.data.list); // Set the data in state with response.data.list
        console.log('Fetched Product Data:', response.data.list); // Console log the fetched data
      } else {
        console.error('Error fetching product data:', response.message);
      }
      return response.data.list; // Return the fetched product data
    } catch (error) {
      console.error('Error fetching product data:', error);
      return [];
    }
  }; 

  const handlePatch = (productId: any) => {
    router.push(`/productUpdate/${productId}`);
  };

  useEffect(() => {
    fetchProductData();
    setColumn([
      {
        id: 'name',
        name: 'Product Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'code',
        name: 'Product Code',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'createdOn',
        name: 'Creation Date',
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
  }, [categoryId]);

  //   const handlePatch = async (formData: any) => {

  //   }

  

  return (
    <>
      {/* <MainHeader
        pageTitle={''}
        buttonLabel={'Add Product'}
        isAddButton={true}
        onButtonClick={handleClick}
      >
        <Typography className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            <Typography component="span">POSM </Typography>
          </Link>
          <Typography component="span"> /   ssdsProduct</Typography>
        </Typography>
      </MainHeader> */}
      <Box className="white-box second-breadcrumb">
        <Breadcrumbs className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            POSM
          </Link>
          <Typography>Product</Typography>
        </Breadcrumbs>
        <Button className='btn btn-black' onClick={handleClick}>Add Product</Button>
      </Box>
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
        fetchData={fetchProductData}
        gridName="ProductList"
        setData={setData}
      />
    </>
  );
};

export default ProductListView;
