'use client';
import React from 'react';
import { useState } from 'react';
import { Typography, Grid, Box, IconButton, Divider, Tooltip} from '@mui/material';
import NewSelectOption from '../../../components/NewSelectbox/NewSelectoption';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NewMultiSelectOption from '../../../components/NewMultiSelect/NewMultiSelectoption';
import { ApiService } from '../../services/api.service';
import { CustomTextField } from '../../../components/TextField/TextField';
import { z } from 'zod';
import AttachFileIcon from '@mui/icons-material/AttachFile';

//import DynamicTable from './dynamicProductTable';
interface ProductInfoProps {
  categoryId: string;
  formData: any;
  setFormData: any;
  handleFieldChange?: any;
  isFormValid: any;
  zones: any;
  markets: any;
  triggerpoint1: any;
  durations: any;
  durations2: any;
  durations3: any;
  triggerpoint2: any;
  triggerpoint3: any;
  attributeData: any;
  handleAttributeChange: any;  
  categoryDetails: any;  
  categoryLineageDetails : any;
  categoryName:any;
  validationErrors:any
  validateField:any
}

interface DocumentRow {
  id: number;
  documentType: string;
  source: string;
  owner: string;
}



const ProductInfo: React.FC<ProductInfoProps> = ({
  categoryId,
  formData,
  setFormData,
  isFormValid,
  handleFieldChange,
  zones,
  markets,
  triggerpoint1,
  durations,
  durations2,
  durations3,
  triggerpoint2,
  triggerpoint3,
  attributeData,
  handleAttributeChange,
  categoryDetails,
  categoryName,
  categoryLineageDetails,
  validationErrors,
  validateField
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  //const [markets, setMarkets] = useState<Market[]>([]);
  const [owner, setOwnerData] = useState<Owner[]>([]);
  //  const [attributeData, setAttributeData] = useState<Attribute[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentRows, setDocumentRows] = useState<DocumentRow[]>([
    { id: 1, documentType: '', source: '', owner: '' },
  ]);
  

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // handleFieldChange(e)
    validateField(name, value); 
  };

  interface Market {
    id: string;
    name: string;
  }
  interface Trigger {
    id: string;
    name: string;
  }
  interface Zone {
    id: string;
    name: string;
  }
  interface Owner {
    id: string;
    name: string;
  }

  interface Duration {
    id: string;
    name: string;
  }


 
  

  const tableData = [
    ['Manufacture Warranty', 'Vendor Warranty', 'Select Duration'],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  const documenttype = ['posmimages', '3ddesign', 'engineeringgraphics'];
  const source = ['adm', 'client', 'vendor'];
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  console.log('Api>>>>', categoryId);
  const getOwnerData = async () => {
    const apiService = new ApiService();
    try {
      // Adjust the API endpoint based on your requirement
      const response = await apiService.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/vendors/Lookup`
      );

      if (response.statusCode === 200) {
        // Assuming your response data is an array of owner objects

        setOwnerData(response.data);
      } else {
        console.error('Failed to fetch owner data');
      }
    } catch (error) {
      console.error('Error fetching owner data:', error);
    }
  };

  const handleAddRow = (index: number) => {
    console.log('row 1 add');
    setDocumentRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, documentType: '', source: '', owner: '' },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    if (documentRows.length > 1) {
      setDocumentRows((prevRows) => prevRows.filter((_, i) => i !== index));
    }
  };
  const productTypeName = categoryDetails?.productType?.name;
  const handleDocumentTypeChange = (index: number, value: string) => {
    setDocumentRows((prevRows) => {
      const updatedRows = prevRows.map((row, i) =>
        i === index ? { ...row, documentType: value } : row
      );
      console.log('Updated Rows:', updatedRows); // Log the updated rows
      return updatedRows;
    });
  };

  // const handleSourceChange = (index: number, value: string) => {
  //   setDocumentRows((prevRows) => {
  //     const updatedRows = prevRows.map((row, i) =>
  //       i === index ? { ...row, source: value, owner: '' } : row
  //     );
  //     console.log('Updated Rows after Source Change:', updatedRows); // Log the updated rows
  //     if (value) {
  //       getOwnerData();
  //     }
  //     return updatedRows;
  //   });
  // };   

  const handleSourceChange = (index: number, value: string) => {
    setDocumentRows((prevRows) => {
      const updatedRows = prevRows.map((row, i) =>
        i === index ? { ...row, source: value, owner: '' } : row
      );
      console.log('Updated Rows after Source Change:', updatedRows); // Log the updated rows
      if (value === 'vendor') {
        getOwnerData();
      } else {
        // Reset owner data to an empty array
        setOwnerData([]);
      }
      return updatedRows;
    });
  };
  
  const handleOwnerChange = (index: number, value: string) => {
    setDocumentRows((prevRows) => {
      const updatedRows = prevRows.map((row, i) =>
        i === index ? { ...row, owner: value } : row
      );
      console.log('Updated Rows after Owner Change:', updatedRows); 
      return updatedRows;
    });
  };

  return (
    <Grid container 
      rowSpacing={3}
      columnSpacing={2}>
      {/* {renderTabContent()} */}
      <Grid item lg={3} md={3.5} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Product Details
        </Typography>
        <Typography className='p'>
          Product Details
        </Typography>
      </Grid>
      <Grid item lg={9} md={8.5} sm={12} xs={12}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('name')}
              onBlur={handleBlur}
              // error={focusedField === 'name' && !formData.name}
              // helperText={
              //   focusedField === 'name' && !formData.name ? 'Name is required' : ''
              // }
              helperText={validationErrors.name}
              error={!!validationErrors.name}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Product Code"
              name="productCode"
              placeholder="Enter Product Code"
              value={formData.productCode}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('productCode')}
              onBlur={handleBlur}
              // error={focusedField === 'productCode' && !formData.productCode}
              // helperText={
              //   focusedField === 'productCode' && !formData.productCode
              //     ? 'Product Code is required'
              //     : ''
              // }
              helperText={validationErrors.productCode} 
              error={!!validationErrors.productCode} 
            
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Lead Time"
              name="leadTime"
              placeholder="Lead Time"
              value={formData.leadTime}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('leadTime')}
              onBlur={handleBlur}
              // error={focusedField === 'leadTime' && !formData.leadTime}
              // helperText={
              //   focusedField === 'leadTime' && !formData.leadTime
              //     ? 'Lead Time is required'
              //     : ''
              // }
              helperText={validationErrors.leadTime} 
              error={!!validationErrors.leadTime} 
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Brand"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('brand')}
              onBlur={handleBlur}
              // error={focusedField === 'brand' && !formData.brand}
              // helperText={
              //   focusedField === 'brand' && !formData.brand
              //     ? 'Brand is required'
              //     : ''
              // }
              helperText={validationErrors.brand} 
              error={!!validationErrors.brand} 
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('description')}
              onBlur={handleBlur}
              // error={focusedField === 'description' && !formData.description}
              // helperText={
              //   focusedField === 'description' && !formData.description
              //     ? 'Description is required'
              //     : ''
              // }
              helperText={validationErrors.description} 
              error={!!validationErrors.description} 
            />
          </Grid>
          {['Non-POSM', 'Raw Material'].includes(productTypeName) ? (
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <TextField
                label="Category Name"
                name="categoryName"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              // onBlur={handleBlur}

                value={categoryName}
                // helperText={validationErrors.categoryName} 
                // error={!!validationErrors.categoryName} 
              />
            </Grid>
          ) : (
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <NewSelectOption
                label="Category Name"
                name="categoryLineageDetails"
                options={(categoryLineageDetails || []).map((category: any) => ({
                  label: category.name,
                  value: category.id,
                }))}
                placeholder="Select Category"
                value={formData.categoryLineageDetails}
                onChange={handleFieldChange}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid>
      
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Attribute	
        </Typography>
        <Typography className='p'>
          Attributes Details
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box className="table-responsive">
          <table className="table cust-table bordered w-100">
            <thead>
              <tr>
                <th className="text-left">Attribute</th>
                <th className="text-left">Value</th>
                <th className="text-left">Unit of Measurement</th>
              </tr>
            </thead>

            <tbody>
              {attributeData.map((attribute: any, index: number) => (
                <tr key={attribute.id}>
                  <td className="text-left">{attribute.name}</td>
                  <td>
                    {['Numeric', 'AlphaNumeric'].includes(
                      attribute.dataType
                    ) ? (
                      <CustomTextField
                        name={attribute.name.toLowerCase()}
                        label=""
                        placeholder={`Enter ${attribute.name}`}
                        value={attribute.val}
                        onChange={(e) => handleAttributeChange(e, index)}
                        size="small"
                        variant='standard'
                      />
                    ) : (
                      <NewSelectOption
                        name={attribute.name.toLowerCase()}
                        options={attribute.applicableValues
                          .split(',')
                          .map((value: any) => ({ label: value, value }))}
                        label=""
                        placeholder={`Select ${attribute.name}`}
                        value={attribute.val}
                        onChange={(e) => handleAttributeChange(e, index)}
                        size="small"
                        variant='standard'
                      />
                    )}
                  </td>
                  <td>
                    {['Numeric', 'AlphaNumeric', 'DropDown'].includes(
                      attribute.dataType
                    ) &&
                      (attribute.unitOfMeasurements.length > 1 ? (
                        <NewSelectOption
                          name={`unit_${attribute.name.toLowerCase()}`}
                          options={attribute.unitOfMeasurements.map(
                            (unit: { name: any; id: any }) => ({
                              label: unit.name,
                              value: unit.id,
                            })
                          )}
                          label=""
                          placeholder={`Select Unit of Measurement for ${attribute.name}`}
                          value={attribute.unitOfMeasurementId || ''}
                          onChange={(e) => handleAttributeChange(e, index)}
                          size="small"
                          variant='standard'
                        />
                      ) : (
                        <CustomTextField
                          name={`unit_${attribute.name.toLowerCase()}`}
                          label=""
                          placeholder={`Enter Unit of Measurement for ${attribute.name}`}
                          value={attribute.unitOfMeasurementId || ''}
                          onChange={(e) => handleAttributeChange(e, index)}
                          size="small"
                          variant='standard'
                        />
                      ))}
                  </td>
                  {/* <td></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Warranty
        </Typography>
        <Typography className='p'>
          Warranty
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box className="table-responsive">
          <table className="table cust-table bordered w-100">
            <thead>
              <tr>
                <th className="text-left">Warranty Type</th>
                <th className="text-left">Trigger Point</th>
                <th className="text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left"> Manufacturer Warranty</td>
                <td style={{ width: '35%' }}>
                  <NewSelectOption
                    name="triggerpoint1"
                    options={[
                  //    { label: '', value: '' }, // This is your placeholder option
                      ...triggerpoint1.map((triggerpoint1: Trigger) => ({
                        label: triggerpoint1,
                        value: triggerpoint1,
                      })),
                    ]}
                    // options={triggerpoint1}
                    label=""
                    placeholder="Select Trigger Point"
                    value={formData.triggerpoint1}
                    onChange={handleFieldChange}
                    size="small"
                    variant='standard'
                  />
                </td>
                <td>
                  <NewSelectOption
                    name="duration"
                    options={[
                   //   { label: '', value: '' }, // This is your placeholder option
                      ...durations.map((durations: Duration) => ({
                        label: durations,
                        value: durations,
                      })),
                    ]}
                    //  options={durations}
                    label=""
                    placeholder="Select Duration"
                    value={formData.duration}
                    onChange={handleFieldChange}
                    size="small"
                    variant='standard'
                  />
                </td>
              </tr>
              <tr>
                <td className="text-left"> Vendor Warranty</td>
                <td style={{ width: '35%' }}>
                  <NewSelectOption
                    name="triggerpoint2"
                    options={[
                    //  { label: '', value: '' }, // This is your placeholder option
                      ...triggerpoint2.map((triggerpoint2: Trigger) => ({
                        label: triggerpoint2,
                        value: triggerpoint2,
                      })),
                    ]}
                    label=""
                    placeholder="Select Trigger Point"
                    value={formData.triggerpoint2}
                    size="small"
                    variant='standard'
                    onChange={handleFieldChange}
                  />
                </td>
                <td>
                  <NewSelectOption
                    name="duration2"
                    options={[
                   //   { label: '', value: '' }, // This is your placeholder option
                      ...durations2.map((durations2: Duration) => ({
                        label: durations2,
                        value: durations2,
                      })),
                    ]}
                    label=""
                    placeholder="Select Duration"
                    value={formData.duration2}
                    size="small"
                    variant='standard'
                    onChange={handleFieldChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-left"> ADM Warranty</td>
                <td style={{ width: '35%' }}>
                  <NewSelectOption
                    name="triggerpoint3"
                    options={[
                   //   { label: '', value: '' }, // This is your placeholder option
                      ...triggerpoint3.map((triggerpoint3: Trigger) => ({
                        label: triggerpoint3,
                        value: triggerpoint3,
                      })),
                    ]}
                    label=""
                    placeholder="Select Trigger Point"
                    value={formData.triggerpoint3}
                    size="small"
                    variant='standard'
                    onChange={handleFieldChange}
                  />
                </td>

                <td style={{ width: '40%' }}>
                  <NewSelectOption
                    name="duration3"
                    options={[
                      // { label: '', value: '' }, // This is your placeholder option
                      ...durations3.map((durations3: Duration) => ({
                        label: durations3,
                        value: durations3,
                      })),
                    ]}
                    label=""
                    placeholder="Select Duration"
                    value={formData.duration3}
                    size="small"
                    variant='standard'
                    onChange={handleFieldChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid>
      <Grid item lg={3} md={3.5} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Applicablity
        </Typography>
        <Typography className='p'>
          Applicablity
        </Typography>
      </Grid>
      <Grid item lg={9} md={8.5} sm={12} xs={12}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <NewSelectOption
              label={
                <>
                  Market
                </>
              }
              name="market"
              placeholder="select market"
              value={formData.market}
              onChange={handleFieldChange}
              options={[
                { label: 'Select a market', value: '' },
                ...markets.map((market: Market) => ({
                  label: market.name,
                  value: market.id,
                })),
              ]}
              style={{ color: 'blue' }}
              className="my-custom-select"
              // error={focusedField === 'market' && !formData.market}
              // helperText={
              //   focusedField === 'market' && !formData.market
              //     ? 'Market is required'
              //     : ''
              // }
              onFocus={() => setFocusedField('market')}
              onBlur={handleBlur}
              required={true}
              sx={{ maxWidth: '100%', background: 'white' }}
              helperText={validationErrors.market} 
              error={!!validationErrors.market} 
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <NewMultiSelectOption
              label={
                <>
                  Zone
                  <span style={{ color: 'red' }}>*</span>
                </>
              }
              name="zone"
              placeholder="Select Zone"
              value={formData.zone}
              onChange={(e) => handleFieldChange(e)}
              options={zones}
              required
              style={{ color: 'blue' }}
              className="my-custom-select"
              onFocus={() => setFocusedField('zone')}
              onBlur={handleBlur}
              // error={focusedField === 'zone' && !formData.zone}
              // helperText={
              //   focusedField === 'zone' && !formData.zone ? 'zone is required' : ''
              // }
          
              sx={{ maxWidth: '100%', background: 'white' }}
            
              error={!!validationErrors.zone}
            helperText={validationErrors.zone}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid>
      <Grid item xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Associate Documents
        </Typography>
        <Typography className='p'>
          Associate Documents
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Box className="table-responsive">
          <table className="table cust-table bordered w-100">
            <thead>
              <tr>
                <th className="text-left">Document Type</th>
                <th className="text-left">Source</th>
                <th className="text-left">Owner</th>
                <th className="text-left">Document</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {documentRows.map((row, index) => (
                <tr key={row.id}>
                  <td style={{ width: '25%' }}>
                    <NewSelectOption
                      name={`documentType_${index}`}
                      options={[
                        // Placeholder option
                        ...documenttype.map((documenttype) => ({
                          label: documenttype,
                          value: documenttype,
                        })),
                      ]}
                      label=""
                      placeholder="Select Document Type" // Adjusted placeholder text
                      value={row.documentType}
                      size="small"
                      variant='standard'
                      onChange={(e) => handleDocumentTypeChange(index, e.target.value)}
                      // displayEmpty // Ensure your component supports this or implements similar functionality
                    />
                  </td>

                  <td style={{ width: '25%' }}>
                    <NewSelectOption
                      name={`source_${index}`}
                      options={[
                        // Placeholder option
                        ...source.map((source) => ({
                          label: source,
                          value: source,
                        })),
                      ]}
                      label=""
                      placeholder="Select Source" // Adjusted placeholder text
                      value={row.source}
                      size="small"
                      variant='standard'
                      onChange={(e) => handleSourceChange(index, e.target.value)}
                      // displayEmpty // Ensure your component supports this or implements similar functionality
                    />
                  </td>

                  <td style={{ width: '25%' }}>
                    <NewSelectOption
                      name={`owner_${index}`}
                      options={[
                        // Placeholder option
                        ...owner.map((owner) => ({
                          label: owner.name,
                          value: owner.id,
                        })),
                      ]}
                      label=""
                      placeholder="Select Owner" // Adjusted placeholder text
                      value={row.owner}
                      size="small"
                      variant='standard'
                      onChange={(e) => handleOwnerChange(index, e.target.value)}
                      // displayEmpty // Ensure your component supports this or implements similar functionality
                    />
                  </td>

                  <td>
                    <input
                      type="file"
                      id="file-input"
                      onChange={handleFileChange}
                      accept=".xlsx, .xls, .json"
                      className="d-none"
                      // onChange={(evt) => { console.log(evt.target.value); }}
                    />
                    {/* <label htmlFor="file-input" className="cust-file-upload size-small">
                      <span className="cust-upload-btn"></span>
                      <span>Select Doc</span>
                    </label> */}
                      <label htmlFor="file-input" className="cust-file-upload cust-file-upload-border ">
                        <Typography component="span">Browse Doc</Typography>
                        <IconButton size="small" color="primary" className='cust-upload-btn'>
                          <AttachFileIcon />
                        </IconButton>
                      </label>
                  </td>

                  <td>
                    <IconButton size="small">
                      <AddIcon onClick={() => handleAddRow(index)} />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteIcon onClick={() => handleDeleteRow(index)} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;