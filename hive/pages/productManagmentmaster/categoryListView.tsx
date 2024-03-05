'use client';
import React, { useEffect, useState } from 'react';
import { Link, Typography, Box, Breadcrumbs, Button } from '@mui/material';
import TableComp from '../TableComp';
import { ApiService } from '../../services/api.service';
import { useRouter } from 'next/navigation';
import { ListProps } from '../outlet';
import MainHeader from '../MainHeader'; 
import TableA from '../TableA';
interface CategoryListViewProps {
  id: string;
  type: string; 
  name:string
}

const CategoryListView: React.FC<CategoryListViewProps> = ({ id, type,name }) => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const apiservice = new ApiService();

  const fetchData = async () => {
    try {
      console.log('function called');
      const response = await apiservice.fetchData(
        `http://20.207.68.38/hiveconnect/configuration/productCategory/tree?id=${id}&type=${type}`
      );
      const newData = response?.data?.list?.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        code: item.code,
        createdOn: item.createdOn,
      }));
      // console.log('function called',);

      if (newData) {
        setData(newData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };   
  const handlePatch = (rowId: any) => {
    router.push(`/addcategory/${rowId}`);
  };
  
  const searchFunction = async () => {
    try {
      if (searchInput) {
    
        const response = await apiservice.fetchData(
          `http://20.207.68.38/hiveconnect/configuration/productCategory/search/${searchInput}`
         
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

  useEffect(() => {
    fetchData();
    console.log('function called', fetchData);

    setColumn([
      {
        id: 'name',
        name: 'Category name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

      {
        id: 'code',
        name: 'Category Code',
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
  }, [id, type]);

  const handleClick = () => {
    router.push(`/addcategory/${id}/${name}/${type}`);
   // router.push('/addcategory');
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  return (
    <>
      {/* <MainHeader
        pageTitle={''}
        buttonLabel={'Add Category'}
        isAddButton={true}
        onButtonClick={handleClick}
      >
        <Typography className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            <Typography component="span">Home </Typography>
          </Link>
          <Typography component="span"> / Product Master </Typography>
        </Typography>
      </MainHeader> */}
      <Box className="white-box second-breadcrumb">
        <Breadcrumbs className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Dashbord
          </Link>
          <Typography>Product Master</Typography>
        </Breadcrumbs>
        <Button className='btn btn-black' onClick={handleClick}>Add Category</Button>
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
        fetchData={fetchData}
        gridName="CategoryList"
        setData={setData}
      />
    </>
  );
};

export default CategoryListView;
