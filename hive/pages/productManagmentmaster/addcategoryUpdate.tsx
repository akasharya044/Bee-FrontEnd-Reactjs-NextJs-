'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  Paper,
  Stack,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewSelectOption from '../../../components/NewSelectbox/NewSelectoption';
import NewTextField from '../../../components/NewTextField/NewTextField';
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from '../MainLayout';
import { CustomTextField } from '../../../components/TextField/TextField';
import { ApiService } from '../../services/api.service';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useRouter } from 'next/navigation';
import MainHeader from '../MainHeader';
import Link from 'next/link';
import '../../styles/globals.css';
import '../../styles/style.css';
import '../../styles/fonts.css';
import '../../styles/global.css';

type Attribute = {
  code: string;
  categoryName: string;
  attributeName: string;
  attributeId: string;
  description: string;
  mandatory: boolean;
  minValue: string;
  maxValue: string;
  unitOfMeasurements: { id: string; name: string }[];
  applicableValues: string;
  dataType: string; 
  [key: string]: any; 
};

const AddCategoryUpdate = ({catData}:any) => {
  const apiservice = new ApiService();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState([]); 
  const [categoryName, setCategoryName] = useState(''); 
  const prop = catData.id ;
  const Category = catData.id; 
  const [categoryId, categoryname, categoryType] = Category;
  const [id, setId] = useState<string | null>('');
  const [mode, setMode] = useState<string>('add');
  const [resData, setResData] = useState<any>({}); 
 
  
  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(event.target.value);
  };
  // Now you can use id, name, and type variables as needed in your component
  
  const [attributes, setAttributes] = useState<Attribute[]>([
   
    
    
          {
            code: '',
            categoryName: '',
            attributeName: '',
            attributeId: '',
            description: '',
            mandatory: false,
            minValue: '',
            maxValue: '',
            unitOfMeasurements: [],
            applicableValues: '',
            dataType: '',
          },
        
        ]);

  const handleAddRow = () => {
    const newRow = {
      code: '',
      categoryName: '',
      attributeName: '',
      attributeId: '',
      description: '',
      mandatory: false,
      minValue: '',
      maxValue: '',
      unitOfMeasurements: [],
      applicableValues: '',
      dataType: '',
    };

    // Update the state with the new row
    setAttributes((prevAttributes: any) => [...prevAttributes, newRow]);
  };
  // useEffect(() => {
  //   const storedValue = sessionStorage.getItem('catyId');  
  //   const storedValue2 = sessionStorage.getItem('catyName'); 
  //   const storedValue3 = sessionStorage.getItem('catyType');
  //   setCategoryId(storedValue);   
  //   setCategoryName(storedValue2); 
  //   setCategoryType(storedValue3);
  // }, []); 
  

      
   const  handleGetByIdCategory = async (productID:any) => { 
    try {
      const response = await apiservice.fetchData(
        `http://20.207.68.38/hiveconnect/configuration/productCategory/${productID}`
      );  
      const categoryresponse = response.data || [];  
     
      const responseData =  {
        categoryName: response.data.name,
        code : response.data.name
      }  
      if (responseData) {
        setResData(responseData);

         
      }
    }  

      catch (error) {
        console.error('Error fetching data:', error);
  
      }
  }     
  const  handleGetByIDattribute = async (productID:any) => { 
    try {
      const response = await apiservice.fetchData(
        `http://20.207.68.38/hiveconnect/configuration/productCategoryAttribute/${productID}`
      );  
      const attributeresponse = response.data || [];  
     
      const responseData =  {
        attributeName:response.data.name,
        description: response.data.description

      }  
      if (responseData) {
        setAttributes(responseData);

         
      }
    }
      catch (error) {
        console.error('Error fetching data:', error);
  
      }
  }   

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    field: string// keyof Attribute
  ) => {    
    const updatedAttributes = [...attributes];
    if (field === 'attributeName') {
      const selectedAttributeName = event.target.value;
      const selectedAttribute = data.find(
        (item) => item.name === selectedAttributeName
      );

      if (selectedAttribute) {
        updatedAttributes[index] = {
          ...updatedAttributes[index],
         
          attributeName: selectedAttribute.name,
          attributeId: selectedAttribute.id,
          description: selectedAttribute.description,
          unitOfMeasurements: selectedAttribute.unitOfMeasurements.map(
            (um: any) => ({ id: um.id, name: um.name })
          ),
          minValue: updatedAttributes[index].minValue,
          maxValue: updatedAttributes[index].maxValue,
          // other fields as necessary
        };
      }
    } else if (field === 'unitOfMeasurements') {
      // For multi-select inputs, event.target.value would be handled differently
    } else { 
      if (field === 'mandatory') {
        updatedAttributes[index][field] = event.target.value === 'true';
      }
      else{
      updatedAttributes[index][field] = event.target.value; 
      }
    }

    setAttributes(updatedAttributes);
  };

  const fetchData = async () => {
    try {
      const response = await apiservice.fetchData(
        'http://20.207.68.38/hiveconnect/configuration/attributes'
      );
      setData(response?.data?.map((item: any) => ({ ...item })));
      setDropdownOptions(
        response?.data?.map((item: any) => ({
          label: item.name,
          value: item.name,
        }))
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      let productTypeId = '';
      let parentId = '';
      
      if (categoryType === 't') {
        // If categoryType is 't', set productType.id to categoryId and parentId to '00000000-0000-0000-0000-000000000000'
        productTypeId = categoryId;  
        
        parentId = '00000000-0000-0000-0000-000000000000';
      } else if (categoryType === 'c') {
        if (categoryId) {
          // If categoryType is 'c', fetch productType.id from the API
          const response = await apiservice.fetchData(
            `http://20.207.68.38/hiveconnect/configuration/productCategory/${categoryId}`
          );
          productTypeId = response?.data?.productType?.id || '';
          parentId = categoryId;
        }
      }

      const attributePayload = attributes.map(
        (attribute: {
          attributeId: any;
          attributeName: any;
          mandatory: any;
          minValue: any;
          maxValue: any;
        }) => ({
          attribute: {
            id: attribute.attributeId,
            name: attribute.attributeName,
          },
          mandatory: attribute.mandatory,
          minValue: attribute.minValue,
          maxValue: attribute.maxValue,
        })
      );

      const payload = {
        name:  categoryName,
        productType: {
          id: productTypeId,
          name: categoryname
        },
        productCategoryAttributes: attributePayload,
        parentId: parentId,
      };

      const response = await apiservice.postData(
        'http://20.207.68.38/hiveconnect/configuration/productCategory',
        payload
      );
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleBack = () => {
    router.push('/productManagement');
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);
  return (
    <MainLayout>
    <MainHeader
     pageTitle={'Add Category'}
     // showAlert={showAlert}
     // alertMsg={'Your employee has been added to the list.'}
   >
     <Typography className="text-dark breadcrumb-text">
       <Link href="/dashboard" className="text-d-none">
         <Typography component="span">Dashboard </Typography>
       </Link>
       <Link href="/productManagement" className="text-d-none">
         <Typography component="span"> / Product Management </Typography>
       </Link>{' '}
       / Add Category
     </Typography>
   </MainHeader>
   <Box className="main-box">
     <Grid container spacing={2} sx={{ height: '100%' }}>
       <Grid item lg={3}>
         <CustomTextField
           label="Code "
           name="Code"
           disabled
           placeholder=""
           value={attributes[0]?.code}
           onChange={(event) => handleFieldChange(event, 0, 'code')}
           required={false}
           onFocus={() => setFocusedField('code')}
           onBlur={() => setFocusedField(null)}
           error={focusedField === 'code' && !attributes[0].code}
           helperText={
             focusedField === 'code' && !attributes[0].code ? '' : ''
           }
         />
       </Grid>
       <Grid item lg={3}>
         <CustomTextField
           label="Category Name"
           name="CategoryName"
           placeholder="Enter Category Name"
           value={categoryName}
           onChange={handleCategoryNameChange}
           required={false}
           onFocus={() => setFocusedField('categoryName')}
           onBlur={() => setFocusedField(null)}
           error={
             focusedField === 'categoryName' && !attributes[0].categoryname
           }
           helperText={
             focusedField === 'categoryName' && !attributes[0].categoryname
               ? 'Category Name is required'
               : ''
           }
         />
       </Grid>
       <Grid item lg={12}>
         <Typography
           component="h3"
           variant="h3"
           className="h3"
           sx={{ m: '0 0 5px !important' }}
         >
           Attributes
         </Typography>

           <TableContainer className="table-responsive">
             <Table className='cust-table borderedless'>
               <TableHead>
                 <TableRow>
                   <TableCell>Attribute name</TableCell>
                   <TableCell>Description</TableCell>
                   <TableCell>Mandatory</TableCell>
                   <TableCell>Minimum Value</TableCell>
                   <TableCell>Maximum Value</TableCell>
                   <TableCell>Unit of Measurement</TableCell>
                   <TableCell>Action</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {attributes.map((row: any, index: any) => (
                   <TableRow key={index}>
                     <TableCell sx={{ width: '17%' }}>
                       <NewSelectOption
                         options={[
                           {
                             label: 'Select Attribute Name',
                             value: '',
                             disabled: true,
                           }, // Placeholder-like option
                           ...dropdownOptions,
                         ]}
                         value={row.attributeName}
                         placeholder="Select an option"
                         onChange={(event) =>
                           handleFieldChange(event, index, 'attributeName')
                         }
                         displayEmpty // Prop to display the empty option when value is ''
                         renderValue={(value: any) =>
                           value === '' ? 'Select Attribute Name' : value
                         } // Optional: Customize rendering of the selected value
                         label="Attribute Name" // Assuming your component accepts a 'label' prop for accessibility
           size="small"
           />
                     </TableCell>

                     <TableCell sx={{ width: '17%' }}>
                       <CustomTextField
                         label="Description"
                         name="description"
                         placeholder="Description"
                         value={row.description}
                         onChange={(event) =>
                           handleFieldChange(event, index, 'description')
                         }
                         size="small"
                         required={true}
                         onFocus={() => setFocusedField('description')}
                         onBlur={() => setFocusedField(null)}
                         error={
                           focusedField === 'description' && !row.description
                         }
                         helperText={
                           focusedField === 'description' && !row.description
                             ? 'Description is required'
                             : ''
                         }
                       />
                     </TableCell>

                     <TableCell sx={{ width: '17%' }}>
                       <Box className="radio-div-td">
                           <RadioGroup
                             row
                             value={row.mandatory !== null ? row.mandatory.toString() : ''}
                             onChange={(e) =>
                               handleFieldChange(e, index, 'mandatory')
                             }
                           >
                             <FormControlLabel
                               value="true"
                               control={<Radio />}
                               label="Yes"
                             />
                             <FormControlLabel
                               value="false"
                               control={<Radio />}
                               label="No"
                             />
                           </RadioGroup>
                         </Box>
                     </TableCell>

                     <TableCell sx={{ width: '17%' }}>
                       <CustomTextField
                        label="Minimum Value"
                         name="minValue"
                         placeholder="Minimum Value"
                         value={row.minValue}
                         onChange={(e) =>
                           handleFieldChange(e, index, 'minValue')
                         }
                         size="small"
                         required={true}
                         onFocus={() => setFocusedField('minValue')}
                         onBlur={() => setFocusedField(null)}
                         error={focusedField === 'minValue' && !row.minValue}
                         helperText={
                           focusedField === 'minValue' && !row.minValue
                             ? 'Minimum value is required'
                             : ''
                         }
                       />
                     </TableCell>

                     <TableCell sx={{ width: '17%' }}>
                       <CustomTextField
                         label="Maximum Value"
                         name="maxValue"
                         placeholder="Maximum Value"
                         value={row.maxValue}
                         onChange={(e) =>
                           handleFieldChange(e, index, 'maxValue')
                         }
                         size="small"
                         required={true}
                         onFocus={() => setFocusedField('maxValue')}
                         onBlur={() => setFocusedField(null)}
                         error={focusedField === 'maxValue' && !row.maxValue}
                         helperText={
                           focusedField === 'maxValue' && !row.maxValue
                             ? 'Maximum value is required'
                             : ''
                         }
                       />
                     </TableCell>

                     <TableCell sx={{ width: '17%' }}>
                         <CustomTextField
                         label="Unit of Measurement"
                         name="unitOfMeasurement"
                         size="small"
                         placeholder="Unit of Measurement"
                         value={row.unitOfMeasurements.map((um:any) => um.name).join(', ')} // Join array into a string
                         onChange={(event) =>
                           handleFieldChange(
                             event,
                             index,
                             'unitOfMeasurements'
                           )
                         }
                         required={true}
                         onFocus={() => setFocusedField('unitOfMeasurements')}
                         onBlur={() => setFocusedField(null)}
                         error={
                           focusedField === 'unitOfMeasurements' &&
                           !row.unitOfMeasurements
                         }
                         helperText={
                           focusedField === 'unitOfMeasurements' &&
                           !row.unitOfMeasurements
                             ? 'Unit of Measurement is required'
                             : ''
                         }
                       />
                     </TableCell>

                     <TableCell sx={{ width: '17%' }}>
                       <Stack direction="row" spacing={1}>
                         <IconButton onClick={() => handleAddRow()}>
                           {/* Add your icon here */}
                           <AddIcon />
                         </IconButton>
                         <IconButton onClick={() => handleDeleteRow(index)}>
                           <DeleteIcon />
                         </IconButton>
                       </Stack>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
           <IconButton onClick={handleAddRow}>
             {/* <AddIcon /> */}
           </IconButton>
         <Grid
           item
           lg={12}
           md={12}
           sm={12}
           xs={12}
           sx={{ textAlign: 'right' }}
         >
           <CustomButton
             className="btn btn-outline"
             variant="outlined"
             onClick={handleBack}
           >
             Back{' '}
           </CustomButton>

           <CustomButton
             type="button"
             // onClick={() => setShowALert(true)}
             onClick={handleSave}
             sx={{ marginLeft: '10px' }}
             className="saveButton btn btn-black"
             // disabled={!isSaveButtonEnabled}
           >
             Save
           </CustomButton>
         </Grid>
       </Grid>
     </Grid>
   </Box>
 </MainLayout>          
  );
};

export default AddCategoryUpdate;
