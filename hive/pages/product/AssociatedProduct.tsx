import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  Box,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  FormControl,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ApiService } from '../../services/api.service';

interface AssociatedProductProps {
  formData: any;
  setFormData: any;
  handleFieldChange: any;
  isFormValid: any;
  categoryId: string;
  name2: string;
  code: string;
  category: string;
  description2: string;
  quantity: string;  
  handleProductSelect : any;
  validationErrors:any
  validateField:any
}

interface Product {
  productCategory: any;
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  quantity: string;
}

const AssociatedProduct: React.FC<AssociatedProductProps> = ({
  categoryId,
  name2,
  code,
  category,
  description2,
  quantity,
  formData,
  setFormData,
  handleFieldChange,
  isFormValid, 
  handleProductSelect,
  validationErrors,
  validateField
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const apiService = new ApiService();
console.log(selectedProduct,'11')
  // useEffect(() => {
  //   const searchFunction = async () => {
  //     try {  
        
  //       const response = await apiService.fetchData(
  //         `http://20.207.68.38/hiveconnect/configuration/product/code/${searchInput}`
  //       );

  //       console.log('product search response', response);

  //       const newProducts = response?.data;
  //       if (newProducts) {
  //         setProducts(newProducts.map((product: Product) => ({ name: product.name, code: product.code,description: product.description ,category: product.productCategory.name})));
  //       }
        
      
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
      
  //   };

  //   if (searchInput.trim() !== '') {
  //     searchFunction();
  //   }
  // }, [searchInput]);  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // handleFieldChange(e)
    validateField(name, value); 
  };

  useEffect(() => {
    const searchFunction = async () => {
      try {
        // Check if search input has at least three characters
        if (searchInput.trim().length >= 3) {
          const response = await apiService.fetchData(
            `http://20.207.68.38/hiveconnect/configuration/product/code/${searchInput}`
          );
  
          console.log('product search response', response);
  
          const newProducts = response?.data;
          if (newProducts) {
            setProducts(newProducts.map((product: Product) => ({
              name: product.name,
              code: product.code,
              description: product.description,
              category: product.productCategory.name
            })));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Execute search function only if search input has at least three characters
    if (searchInput.trim().length >= 3) {
      searchFunction();
    }
  }, [searchInput]);
  

console.log(selectedProduct,'111')


  // const handleProductSelect = (selectedProduct: Product | null) => {
  //   setSelectedProduct(selectedProduct);
  //   if (selectedProduct) {

  //     console.log('Updating form data with:', {
  //       code: selectedProduct.code,
  //       name2: selectedProduct.name,
  //       category: selectedProduct.category, 
  //       description2: selectedProduct.description || '', 
  //     });
  //     console.log("selected product",selectedProduct)
      
  //     setFormData((prevData: any) => ({
  //       ...prevData,
  //       code: selectedProduct.code,
  //       name2: selectedProduct.name,
  //       category: selectedProduct.category ,
  //       description2: selectedProduct.description ,
        
  //     }));
  //   }
  // };
  
  return (
    <>
      <Grid container 
        rowSpacing={3}
        columnSpacing={2}
      >
        {/* {renderTabContent()} */}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography component="h3" variant="h3" className="h3">
            Associate Product
          </Typography>
          <Typography className='p'>
            Associate product Details
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box className="table-responsive">
            <Table className='table cust-table bordered'> 
              <TableHead>
                <TableRow>
                  <TableCell> Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '17%' }}>
                    <FormControl fullWidth className="cust-form-control position-unset">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={products}
                        getOptionLabel={(option) => option.code || ''}
                      //  value={products.find((product) => product.code === formData.code) || null}
                        value={selectedProduct}
                        // onChange={(event, newValue) => {
                        //   handleFieldChange({
                        //     target: { name: 'code', value: newValue ? newValue.code : '' },
                        //   });
                        // }}
                        onChange={(event, newValue) => handleProductSelect(newValue)}
                        inputValue={searchInput}
                        onInputChange={(event, newInputValue) => setSearchInput(newInputValue)}
                        openOnFocus
                        loading={loading}
                        renderInput={(params) => <TextField {...params} placeholder="Select Code" variant='standard' />}
                        size="small"
                      />            
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ width: '17%' }}>
                    <Grid item xs={12}>
                      <FormControl fullWidth className="cust-form-control">
                        <TextField
                            name="name2"
                            placeholder="Name" 
                            value={formData.name2}
                            required={true}
                            onChange={handleFieldChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={handleBlur}
                            // error={focusedField === 'name' && !selectedProduct?.name}
                            size="small"
                            variant='standard'
                            helperText={validationErrors.name2} 
                            error={!!validationErrors.name2} 
                          />
                        </FormControl>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth className="cust-form-control">
                      <TextField
                        name="category"
                        placeholder="Category" 
                        value={formData.category}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('category')}
                        onBlur={() => setFocusedField(null)}
                        error={focusedField === 'category' && !selectedProduct?.category}
                        size="small"
                        variant='standard'
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth className="cust-form-control">
                      <TextField
                        name="description2"
                        placeholder="Description" 
                        value={formData.description2}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('description')}
                        onBlur={() => setFocusedField(null)}
                        error={focusedField === 'description' && !selectedProduct?.description}
                        size="small"
                        variant='standard'
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth className="cust-form-control">
                      <TextField
                        name="quantity"
                        placeholder="Quantity" 
                        value={formData.quantity}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('quantity')}
                        onBlur={() => setFocusedField(null)}
                        error={focusedField === 'quantity' && !formData.quantity}
                        size="small"
                        variant='standard'
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ width: '10%' }}>
                    {/* Action buttons */}
                    <IconButton aria-label="add" size='small'>
                      <AddIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size='small'>
                      <DeleteIcon />
                    </IconButton>
                    {/* <Button variant="outlined" startIcon={<AddIcon />} />
                    <Button variant="outlined" startIcon={<RemoveIcon />} /> */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default AssociatedProduct;