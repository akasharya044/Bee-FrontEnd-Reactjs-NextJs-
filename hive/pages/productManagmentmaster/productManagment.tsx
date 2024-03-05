'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Breadcrumbs } from '@mui/material';
import MainLayout from '../MainLayout';
import ProductTreeView from './ProductTreeView';
import CategoryListView from './categoryListView';
import ProductListView from './productListView';
import Productcatlist from './prodcatlist';
import { ApiService } from '../../services/api.service';
import MainHeader from '../MainHeader';
import Link from 'next/link';

// Import statements...

interface ProductManagementProps {
  id: string;
  type: string;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ id, type }) => {
  const [selectedItem, setSelectedItem] = useState({
    id: '',
    name: '',
    type: '',
    hasChildren: false,
  });
  const [productData, setProductData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('ProductManagement - selectedItem:', selectedItem);

  const handleNodeSelect = (
    nodeId: string,
    nodeName: string,
    nodeType: string,
    hasChildren: boolean
  ) => {
    setSelectedItem({
      id: nodeId,
      name: nodeName,
      type: nodeType,
      hasChildren,
    });
    // Fetch product data whenever a new node is selected
    fetchProductData(nodeId);
  };

  const fetchProductData = async (categoryId: string) => {
    setLoading(true);
    const apiservice = new ApiService(); // Assuming ApiService is setup to make fetch requests
    const baseUrl = 'http://20.207.68.38';
    const endpoint = `/hiveconnect/configuration/product/category/${categoryId}`;
    const fullUrl = baseUrl + endpoint;

    try {
      const response = await apiservice.fetchData(fullUrl);
      console.log('API Response:', response); // Log the entire response

      if (response.statusCode === 200 && response.data) {
        setProductData(response.data.list); // Update state with fetched product data
        console.log('Fetched Product Data:', response.data.list);
      } else {
        console.error('Error fetching product data:', response.message);
        setProductData([]); // Reset the product data in case of an error
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      setProductData([]); // Reset the product data in case of an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box className="white-box" sx={{mb: '15px'}}>
        <Breadcrumbs className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Typography> Product Master </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container  rowSpacing={2} columnSpacing={2} sx={{ height: '100%', marginTop: '0px' }} className='product-managment page-padding-container'>
        <Grid item xl={2} lg={3} md={3.5} sm={12} xs={12}>
          <Box className="treeview-section">
            <ProductTreeView onNodeSelect={handleNodeSelect} />
          </Box>
        </Grid>
        <Grid item xl={10} lg={9} md={8.5} sm={12} xs={12} sx={{ pt: '0 !important' }}>
        {selectedItem.type === 't' && selectedItem.name === 'POSM' ? (
          <CategoryListView id={selectedItem.id} type={selectedItem.type}name = {selectedItem.name} />
        ) : (
          <>
            {selectedItem.type === 't' || selectedItem.hasChildren ? (
              <CategoryListView id={selectedItem.id} type={selectedItem.type} name = {selectedItem.name} />
            ) : (
              <>
                {productData.length > 0 ? (
                  <ProductListView
                    categoryId={selectedItem.id}
                    // Assuming ProductListView takes productData as a prop or fetches it internally
                  />
                ) : (
                  <Productcatlist
                    categoryId={selectedItem.id}
                    categoryName={selectedItem.name} 
                    categorytype = {selectedItem.type}
                    // Assuming Productcatlist may also take fetchProductData or other props as needed
                  />
                )}
              </>
            )}
          </>
        )}
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default ProductManagement;
