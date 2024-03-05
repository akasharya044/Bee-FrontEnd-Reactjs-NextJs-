'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Link, Typography, Breadcrumbs } from '@mui/material';
import CustomButton from '../../../components/CustomButton/CustomButton';
import TableComp from '../TableComp';
import { ApiService } from '../../services/api.service';
import { useRouter } from 'next/navigation';
import { ListProps } from '../outlet';
interface ProductcatlistProps {
  categoryId: string; 
  categoryName: string ; 
  categorytype: string ;
}

const Productcatlist: React.FC<ProductcatlistProps> = ({ categoryId, categoryName,categorytype }) => {
  const router = useRouter();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const apiservice = new ApiService();

  useEffect(() => {
    setColumn([
      {
        id: 'productName',
        name: 'Product Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

      {
        id: 'productCode',
        name: 'Product Code',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'creationDate',
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
  }, []);

  const handleClick = () => {
    sessionStorage.setItem('catyId', categoryId);
    sessionStorage.setItem('catyName', categoryName);
    router.push(`/productForm`);
    console.log('catId', categoryId);
    console.log('catyName', categoryName);
  };

  const handleClickable = () => {  
    router.push(`/addcategory/${categoryId}/${categoryName}/${categorytype}`);
    //router.push(`/addcategory`);  
  };

  const deleteRow = (id: number) => {
    console.log('delete', id);
  };

  //   const handlePatch = async (formData: any) => {

  //   }
  return (
    <Grid spacing={2}>
      <Box className="white-box second-breadcrumb">
        <Breadcrumbs className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            POSM
          </Link>
          <Typography>Product</Typography>
        </Breadcrumbs>
          <Box sx={{display: 'flex', gap: 1, width: "50%", justifyContent: 'end'}}>
          <CustomButton
            onClick={handleClick}
            className="btn btn-black"
          >
            Add Product
          </CustomButton>
          <CustomButton
            onClick={handleClickable}
            className="btn btn-black"
          >
            Add Category
          </CustomButton>
          </Box>
        </Box>
      {/* <TableComp
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
        //handlePatch={handlePatch}
        searchInput={searchInput}
      /> */}
    </Grid>
  );
};

export default Productcatlist;