'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Alert,
  Grid,
  Typography, Divider, Breadcrumbs
} from '@mui/material';
import MainLayout from './MainLayout';
import Link from 'next/link';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import { useRouter } from 'next/navigation';
import MainHeader from './MainHeader';
import Address from '../../components/Address/Address';
import { ApiService } from '../services/api.service';
import { ApiService1 } from '../services/api1.service';
import CustomButton from '../../components/CustomButton/CustomButton';
import { CustomTextField } from '../../components/TextField/TextField';
import { z } from 'zod';
import { CheckCircleOutline } from '@mui/icons-material';

const isOnlyDigits = (value: string) => /^\d+$/.test(value);

const formSchema = z.object({
  name: z.string()
    .min(1, 'Name is required').max(50, ' Name must be 50 characters or less')
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' Only Alphabets are allowed' }),

  legalName: z.string()
    .min(1, 'legal Name is required').max(50, ' legal Name must be 50 characters or less')
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' Only Alphabets are allowed' }),

  contactName: z.string()
    .min(1, 'Contact Name is required')
    .max(50, ' Contact Name must be 50 characters or less')
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' Alphabets are allowed' }),


  // emailAddress: z.string().email('Invalid email format'),
  emailAddress: z.string()
    .email('Email required',)
    .refine((val) => val === undefined || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
      message: ' Invalid email format',
    }),

  state: z.string().min(1, 'State is required'),
  city: z.string()
    .min(1, 'City is required')
    .max(100, 'City must be 100 characters or less') // Ensure city is no more than 100 characters
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: 'City should only contain alphabets' }),

  country: z.string().min(1, 'Country is required'),
  address: z.string().min(1, 'Address is required').max(255, ' Address field should not accept more than 255 characters'),

  wareHouseType: z.string().min(1, 'Warehouse Type is required'),
  vendors: z.string().optional(), // Optional since it depends on wareHouseType

  contactNo: z.string()
    .min(10, 'Contact Number must be exactly 10 digits.')
    .max(10, 'Contact Number must be exactly 10 digits.')
    .refine(isOnlyDigits, 'Contact Number must contain only digits.')
    .refine((val) => val.length === 10, 'Contact Number must be exactly 10 digits and contain only numbers.'),

  pincode: z.string()
    .min(6, 'Pincode must be exactly 6 digits.')
    .max(6, 'Pincode must be exactly 6 digits.')
    .refine(isOnlyDigits, 'Pincode must contain only digits.')
    .refine((val) => val.length === 6, 'Pincode must be exactly 6 digits and contain only numbers.'),

});



// Define your component
const WarehouseForm: React.FC = () => {
  // Define your initial form state
  const initialFormData = {
    name: '',
    legalName: '',
    contactName: '',
    contactNo: '',
    emailAddress: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
    address: '',
    vendors: '',
    wareHouseType: '',
  };



  interface FormErrors {
    [key: string]: string | undefined;
  }

  interface FormData {
    name: string;
    legalName: string;
    contactName: string;
    contactNo: string;
    emailAddress: string;
    state: string;
    city: string;
    country: string;
    address: string;
    pincode: string;
    wareHouseType: string; // Add this line for warehouse type
    vendors: string;
  }

  interface FormErrors {
    name?: string;
    legalName?: string;
    contactName?: string;
    contactNo?: string;
    emailAddress?: string;
    state?: string;
    city?: string;
    country?: string;
    pincode?: string;
    address?: string;
    vendors?: string;
    wareHouseType?: string;
    // Add any additional error fields corresponding to FormData
  }

  interface Country {
    id: string;
    name: string;
  }
  interface State {
    id: string;
    name: string;
  }
  interface Designation {
    id: string;
    name: string;
  }
  interface Department {
    id: string;
    name: string;
  }

  type CustomChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | { target: { name: string; value: string } };

  // Initialize state variables
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const router = useRouter();
  const [country, setCountries] = useState<Country[]>([]);
  const [state, setStates] = useState<State[]>([]);
  const [vendorList, setVendorList] = useState([]);
  const [resData, setResData] = useState<any>({});
  const [isVendorAllocationVisible, setIsVendorAllocationVisible] =
    useState(false);
  const [mode, setMode] = useState<string | null>('add');
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const apiservice = new ApiService();
  const apiService1 = new ApiService1();
  const [id, setId] = useState<string | null>('');
  const [selectedValue, setSelectedValue] = useState('Option 1');
  const [warehouseList, setWarehouseList] = useState([]);

  const handleVendorChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const newValue = e.target.value as string; // Cast value to string
    const name = e.target.name as keyof FormData; // Ensure name is a key of FormData

    setSelectedVendor(newValue); // Update selectedVendor state

    // Update formData state with the selected vendor
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: newValue, // Ensure this matches the formData structure
    }));
  };

  const validateField = (name: any, value: string) => {

    if (value.trim() === '') {
      return `${name} is required`;
    }
    return '';
  };

  const getcountryIds = async () => {
    try {

      const response = await apiservice.fetchData(
        'http://20.219.214.84/hiveconnect/common/country'
      );

      if (response.statusCode === 200) {


        setCountries(response.data);

      } else {

      }
    } catch (error) {

    }
  };

  useEffect(() => {

    getcountryIds();
    // getstateIds();
    fetchVendor();
    getWarehouseType();
  }, []);

  const setData = (warehouseList: any, vendorList: any) => {
    const { wareHouseType, vendors } = formData;
    warehouseList?.find((ele: any) => {
      if (ele.name == wareHouseType) {
        formData.wareHouseType = ele.id;
      }
    });
    vendorList?.find((ele: any) => {
      if (ele.name == vendors) {
        formData.vendors = ele.id;
      }
    });
  };

  setData(warehouseList, vendorList);
  const getstateIds = async (value: any) => {
    try {
      const response = await apiservice.fetchData(
        `http://20.219.214.84/hiveconnect/common/state/country/${value}`
      );
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getWarehouseType = async () => {
    try {
     
      const response = await apiservice.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/warehousetypes'
      );

      setWarehouseList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchVendor = async () => {
    try {
      const response = await apiservice.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/vendors/Lookup'
      );
      

      setVendorList(response.data); // Update the vendor list state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGetBYId = async () => {
   
    try {

      const response = await apiservice.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/warehouses/${id}`
      );

      const responseData = {
        name: response.data.name,
        legalName: response.data.legalName,
        contactName: response.data.contactName,
        contactNo: response.data.contactNo,
        emailAddress: response.data.emailAddress,
        state: response.data.address.state,
        city: response.data.address.city,
        country: response.data.address.country,
        address: response.data.address.name,
        pincode: response.data.address.pincode,
        wareHouseType: response.data.wareHouseType,
        vendors: response.data.vendors,
      };

      if (responseData) {
        
        setResData(responseData);
        setFormData(responseData); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleFieldChange = (event: { target: any; }) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    const validationResult = formSchema.safeParse(updatedFormData);
    if (name == 'country') {
      getstateIds(value);
    }


    if (!validationResult.success) {
      const error = (validationResult.error as z.ZodError<{ [k: string]: string[] }>).flatten().fieldErrors[name]?.join(", ");
      setErrors({ ...errors, [name]: error });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
    setFormData(updatedFormData);

  };


  // Function to validate GST number
  const validateGSTNumber = (gstNumber: string) => {
    let errorMessage = '';
    if (gstNumber.length !== 15) {
      errorMessage = 'GST number must be exactly 15 digits';
    }

    setErrors((prevState) => ({ ...prevState, gstNumber: errorMessage }));
  };
  // Function to check if the form is valid
  const isFormValid = () => {
    // Check whether mandatory fields are filled
    const mandatoryFields = [
      'name',
      'legalName',
      'contactName',
      'contactNo',
      'emailAddress',
      'wareHouseType',
      'vendors',
      'state',
      'city',
      'country',
      'pincode',
    ] as const;

    for (const field of mandatoryFields) {
      if (!formData[field]) {
        return false;
      }
    }

    return true;
  };


  const handleSave = async () => {

    const validationResult = formSchema.safeParse(formData);



    if (!validationResult.success) {
      const simplifiedErrors = Object.entries(validationResult.error.flatten().fieldErrors).reduce((acc, [key, value]) => {
        acc[key] = value.join(", ");
        return acc;
      }, {} as Record<string, string>);

      setErrors(simplifiedErrors);
      return;
    }

    if (mode === 'edit') {
      const patchArr: { op: string; path: string; value: any }[] = [];
      for (const key in resData) {
        if (key in initialFormData) {
          const formDataKey = key as keyof FormData;
          if (resData[formDataKey] !== formData[formDataKey]) {
            patchArr.push({
              op: 'replace',
              path: `${formDataKey}`,
              value: formData[formDataKey],
            });
          }
        }
      }
     
      try {
        const response = await apiService1.patchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/warehouses/${id}`,
          patchArr
        );

        

        if (response.statusCode === 200) {
          router.push('/warehouse');
        }
        setShowAlert(true);
      } catch (error) {
       
        alert(error);
      }
      return;
    }

    const newErrors: FormErrors = { ...errors };
    let hasError = false;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const value = formData[key];
      const error = validateField(key, value);

      if (error) {
        newErrors[key] = error;
        hasError = true;
      } else {
        delete newErrors[key];
      }
    });

    setErrors(newErrors as Record<string, string>);

    if (hasError) {
      return; // Stop if there are errors
    }


    const data = {

      name: formData.name,
      contactName: formData.contactName,
      contactNo: formData.contactNo,
      emailAddress: formData.emailAddress,
      legalName: formData.legalName,
      code: 'code',
      status: 1,
      address: {
        name: formData.address,
        state: { id: formData.state },
        country: { id: formData.country },
        city: formData.city,
        pincode: formData.pincode,
      },
      vendors: {
        id: formData.vendors,
      },
      wareHouseType: {
        id: formData.wareHouseType,
        // name: 'string',
      },
    };
   
    
    if (true) {
      try {

        const responseData = await apiservice.postData(
          'http://4.224.102.99/hiveconnect/requestmanagement/warehouses',
          data
        );

        
        if (responseData.statusCode === 200) {
          router.push('/warehouse');
        }
        setShowAlert(true);
        setFormData(initialFormData); // Reset form if needed
      } catch (error) {
        console.error('Error saving data:', error);
        // Handle error, show user feedback
      }
    }
  };
  const handleBack = () => {
    router.push('/warehouse');
  };

  const buttonStyle = {
    backgroundColor: 'orange', // Orange background
    color: 'white', // White text
    border: 'none', // No border
    padding: '10px 20px', // Padding for button size
    margin: '0 10px', // Margin for spacing
    cursor: 'pointer', // Cursor to indicate it's clickable
    borderRadius: '5px', // Rounded corners
  };

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const options = [
    { id: '1', value: 'Option 1' },
    { id: '2', value: 'Option 2' },
    // Add more options as needed
  ];

  return (
    <MainLayout>
      <MainHeader pageTitle={'Warehouse'} showAlert={showAlert}>
        <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Link href="/warehouse" className="text-d-none">
            Warehouse Master
          </Link>
          <Typography color="text.primary">Add New Warehouse</Typography>
        </Breadcrumbs>
        {showAlert && (
          <Alert className='custom-alert' icon={<CheckCircleOutline />} severity="success">
            Your warehouse has been added to the list.
          </Alert>
        )}
      </MainHeader>

      <Box
        className="input-form outletform-box page-padding-container"
      >
        <Box component="div" className="form-body">
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
          >
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography component="h3" variant="h3" className="h3">
                Warehouse Information
              </Typography>
              <Typography className='p'>
                Basic information about the warehouse
              </Typography>
            </Grid>
            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <NewSelectOption
                    placeholder="Select Type"
                    name="wareHouseType" // Change this to warehouseType
                    label="Warehouse Type"
                    value={formData.wareHouseType}
                    onChange={handleFieldChange}
                    required={true}
                    options={warehouseList.map((st: any) => ({
                      label: st.name,
                      value: st.id,
                    }))} // You need to define this list
                    sx={{ width: '100%' }}
                    onFocus={() => setFocusedField('wareHouseType')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.wareHouseType}
                    helperText={errors.wareHouseType || (focusedField === 'wareHouseType' && !formData.wareHouseType ? 'Warehouse Type is required' : '')}

                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name || ''}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="legalName"
                    label="Legal Name"
                    placeholder="Enter Legal Name"
                    value={formData.legalName}
                    onChange={handleFieldChange}
                    error={Boolean(errors.legalName)}
                    helperText={errors.legalName || ''}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider className="cust-divider" />
            </Grid>
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography component="h3" variant="h3" className="h3">
                Warehouse Contact Information
              </Typography>
              <Typography className='p'>
                Contact Details of the warehouse
              </Typography>
            </Grid>
            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid container
                rowSpacing={3}
                columnSpacing={2}
              >
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="contactName"
                    label="Contact Name"
                    placeholder="Contact Name"
                    value={formData.contactName}
                    onChange={handleFieldChange}
                    required={true}
                    onFocus={() => setFocusedField('contactName')}
                    onBlur={() => setFocusedField(null)}
                    error={Boolean(errors.contactName)}
                    helperText={errors.contactName}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="contactNo"
                    label="Contact No"
                    placeholder="Contact No"
                    value={formData.contactNo}
                    onChange={handleFieldChange}
                    required={true}
                    onFocus={() => setFocusedField('contactNo')}
                    onBlur={() => setFocusedField(null)}
                    error={Boolean(errors.contactNo)}
                    helperText={errors.contactNo}

                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="emailAddress"
                    label="Email"
                    placeholder="Email"
                    value={formData.emailAddress}
                    onChange={handleFieldChange}
                    required={true}
                    onFocus={() => setFocusedField('emailAddress')}
                    onBlur={() => setFocusedField(null)}
                    error={Boolean(errors.emailAddress)}
                    helperText={errors.emailAddress}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={2}
                  >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <CustomTextField
                        name="address"
                        label="Address"
                        placeholder="Enter Address"
                        value={formData.address}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        error={Boolean(errors.address)}
                        helperText={errors.country}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <NewSelectOption
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleFieldChange}
                        onBlur={() => setFocusedField(null)}
                        onFocus={() => setFocusedField('country')}
                        required={true}
                        error={Boolean(errors.country)}
                        helperText={errors.country}
                        options={[
                          { label: 'Select Country', value: '' },
                          ...country.map((c) => ({
                            label: c.name,
                            value: c.id,
                          })),
                        ]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <NewSelectOption
                        label="State/County"
                        name="state"
                        value={formData.state}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('state')}
                        onBlur={() => setFocusedField(null)}
                        required={true}
                        error={Boolean(errors.state)}
                        helperText={errors.state}
                        options={[
                          { label: 'Select State', value: '' },
                          ...state.map((s) => ({
                            label: s.name,
                            value: s.id,
                          })),
                        ]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <CustomTextField
                        name="city"
                        label="City"
                        placeholder="Enter City"
                        value={formData.city}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('city')}
                        onBlur={() => setFocusedField(null)}
                        required={true}
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <CustomTextField
                        name="pincode"
                        label="Pincode"
                        placeholder="Enter Pincode"
                        value={formData.pincode}
                        onChange={handleFieldChange}
                        onFocus={() => setFocusedField('pincode')}
                        onBlur={() => setFocusedField(null)}
                        required={true}
                        error={Boolean(errors.pincode)}
                        helperText={errors.pincode}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {warehouseList.find((ele: any) => {
              if (ele.id == formData.wareHouseType && ele.name == 'Vendor') {
                return true;
              }
            }) && (
                <>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Divider className="cust-divider" />
                  </Grid>
                  <Grid item lg={3} md={3.5} sm={12} xs={12}>
                    <Typography component="h3" variant="h3" className="h3">
                      Allocate Vendor
                    </Typography>
                    <Typography className='p'>
                      Vendor allocation
                    </Typography>
                  </Grid>
                  <Grid item lg={9} md={8.5} sm={12} xs={12}>
                    <Grid container
                      rowSpacing={3}
                      columnSpacing={2}
                    >
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <NewSelectOption
                          placeholder="Select Vendor"
                          name="vendors"
                          label="Vendor"
                          value={formData.vendors}
                          onChange={handleVendorChange}
                          required={true}
                          options={vendorList.map((st: any) => ({
                            label: st.name,
                            value: st.id,
                          }))}
                          onFocus={() => setFocusedField('vendors')}
                          onBlur={() => setFocusedField(null)}
                          error={!!errors.vendors} // Check if there is an error for 'vendors'
                          helperText={
                            errors.vendors ||
                            (focusedField === 'vendors' && !formData.vendors
                              ? 'Vendor is required'
                              : '')
                          } // Display the error message for 'vendors'
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
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
                onClick={handleSave}
                sx={{ marginLeft: '10px' }}
                className="saveButton btn btn-black"
              >
                Save
              </CustomButton>

            </Grid>
          </Grid>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default WarehouseForm;
