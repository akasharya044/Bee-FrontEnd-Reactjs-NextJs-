'use client';
import React, { useState, FocusEvent, useEffect } from 'react';
import { Box, Typography, Grid, Alert, Breadcrumbs, Divider } from '@mui/material';
// import { CustomTextField } from '../../components/TextField/TextField';
import CustomButton from '../../components/CustomButton/CustomButton';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import '../styles/style.css';
import { useRouter } from 'next/navigation';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import Address,{addressSchema } from '../../components/Address/Address';
// import Code from '../../components/Code/Code';
import { ApiService } from '../services/api.service';
import { ApiService1 } from '../services/api1.service';
import { z } from 'zod';
import { CustomTextField } from '../../components/TextField/TextField';
import MainHeader from './MainHeader';
import { CheckCircleOutline } from '@mui/icons-material';

export interface Country {
  id: string;
  name: string;
}

type PatchOperation = {
  op: string;
  path: string;
  value: any; // Consider using a more specific type if possible
};

const OutletUpdate = (props:any) => {
  const router = useRouter();

  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);

  const [formData, setFormData] = useState<any>({
    // Add the property names and their initial values
    name: '',
    lanCode: '',
    emailAddress: '',
    address: '',
    
    city: '',
    country: '',
    state: '',
    zone: '',
    code: '',
    pincode: '',
    contactName: '',
    gpsCoordinates: '',
    gpsLink: '',
    tmeId: '',
    tseId: '',
    asmId: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowALert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [tseNames, setTseNames] = useState<Country[]>([]);
  const [tmeNames, setTmeNames] = useState<Country[]>([]);
  const [asmNames, setASMNames] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<Country[]>([]);
  const [mode, setMode] = useState<string | null>('add');
  const [patch, setPatch] = useState({});
  const [resData, setResData] = useState<any>({});
  const apiService = new ApiService();
  const apiService1 = new ApiService1();
  const [id, setId] = useState<string | null>('');


 const outletSchema = z.object({
  name: z.string()
    .min(1, 'Name is required').max(50, ' Name must be 50 characters or less')
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' Only Alphabets are allowed' }),
  lanCode: z.string()
    .min(1, 'LAN Code is required')
    .max(50, ' Lan Code must be 50 characters or less')
    .refine((val) => /^[a-zA-Z0-9]+$/.test(val), 'LAN Code must be alphanumeric'),
  emailAddress: z.string()
    .email('emailAddress required',)
    .max(50, ' emailAddress must be 50 characters ')
    .email('Invalid emailAddress format'),
  address: z.string().min(1, 'Address is required').max(255, ' Address field should not accept more than 255 characters'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required' ).refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' should only contain alphabets' }),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  zone: z.string().optional(),
  code: z.string().optional(),
  pincode: z.string()
    .min(1, 'Pincode is required')
    .refine((val) => /^\d{1,6}$/.test(val), { message: ' must be 6 digits ' }),
  contactName: z.string()
    .min(1, 'Contact Name is required')
    .max(50, ' Contact Name must be 50 characters or less')
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' Alphabets are allowed' }),
  gpsCoordinates: z.string().min(1, ' GPS Coordinates required')
  .max(50, 'Onley 50 characters or less')
  .refine((val) => /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/.test(val), {
    message: 'Invalid formate',
  }),
  gpsLink: z.string()
  .min(1, 'GPS Link is required')
  .max(50, ' GPS Link must be 50 characters or less')
  .refine((val) => /^(https?:\/\/)[\w-]+(\.[\w-]+)+([\w-.,@?^=%&:/+#]*[\w-@?^=%&/+#])?$/.test(val), {
    message: 'Invalid GPS link', 
  }),
  tmeId: z.string().optional(),
  tseId: z.string().optional(),
  asmId: z.string().optional(),
  contactNumber: z.string()
    .min(1, 'Contact No is required')
    .refine(val => /^\d{10}$/.test(val), { message: 'Onley 10 digits are allowed' })
})
  

  const validateField = (name: any, value: string) => {

    if (value.trim() === '') {
      return `${name} is required`;
    }
    return '';
  };

  useEffect(() => {
    async function getTMEdesignation() {
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/clientemployee/designation/client/TME'
      );
      setTmeNames(response.data);
      console.log('tme names', response.data);
    }
    async function getTSEdesignation() {
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/clientemployee/designation/client/TSE'
      );
      setTseNames(response.data);
      console.log('tse name', response.data);
    }
    async function getASMdesignation() {
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/clientemployee/designation/client/ASM'
      );
      setASMNames(response.data);
      console.log('asm names', response.data);
    }
    getTMEdesignation();
    getTSEdesignation();
    getASMdesignation();
    getcountryIds();
    getstateIds();
    console.log('countries data', countries);
   // const storedValue = getValueFromSessionStorage();
   
   const storedValue = props.outletId;
   if (storedValue) {
      setMode('edit');
      setId(storedValue);
      handleGetBYId(storedValue);
    }

    return () => {
      sessionStorage.removeItem('outletId');
    };
  }, []);

  // useEffect(() => {

  // },[countries])

  const getValueFromSessionStorage = () => {
    const storedValue = sessionStorage.getItem('outletId');
    return storedValue || '';
  };

  const getcountryIds = async () => {
    try {
      console.log('Fetching country data...');
      const response = await apiService.fetchData(
        'http://20.219.214.84/hiveconnect/common/country'
      );

      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response market data', response);
        // Assuming your response data is an array of market objects
        setCountries(response.data);
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  const getstateIds = async () => {
    try {
      console.log('Fetching country data...');
      const response = await apiService.fetchData(
        'http://20.219.214.84/hiveconnect/common/state'
      );

      console.log('response', response);
      if (response.statusCode === 200) {
        console.log('response market data', response);
        // Assuming your response data is an array of market objects
        setStates(response.data);
        console.log('response after setting', response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  
  const handleFieldChange = (event: { target: any; }) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    const validationResult = outletSchema.safeParse(updatedFormData);
  
    // if (!validationResult.success) {
    //   // If validation fails, update the errors state with the new error
    //   const error = validationResult.error.flatten().fieldErrors[name]?.join(", ");
    //   setErrors({ ...errors, [name]: error });
    // } else {
    //   // If validation is successful, clear the error for the field
    //   const newErrors = { ...errors };
    //   delete newErrors[name];
    //   setErrors(newErrors);
    // }

    if (!validationResult.success) {
      const error = (validationResult.error as z.ZodError<{ [k: string]: string[] }>).flatten().fieldErrors[name]?.join(", ");
      setErrors({ ...errors, [name]: error });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  
    // Always update the form data state
    setFormData(updatedFormData);
  };
  

  
  const checkFormValidity = () => {
    const isValid = Object.values(errors).every((errorMsg) => errorMsg === '');
    setSaveButtonEnabled(isValid);
  };

  // Additional function to check overall form validity

  console.log(formData, 'formData');

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocusedField(event.target.name);
  };

  const handleBlur = (event: { target: any; }) => {
    handleFieldChange(event); // This will trigger validation on blur
    setFocusedField(null);
  };
  

  const isFormValid = () => {
    if (
      formData.name &&
      formData.lanCode &&
      formData.address &&
      // formData.zone &&
      formData.state &&
      formData.city &&
      formData.country
    ) {
      return true;
    }
    return false;
  };

 
  useEffect(() => {
    const formIsValid = isFormValid();
    setSaveButtonEnabled(formIsValid);
  }, [formData]);

  const handleBack = () => {
    router.push('/outlet');
  };

  const handleGetBYId = async (outletId: any) => {
   
    console.log('getId>>', id);
    try {
      console.log('function called', countries);
      const response = await apiService.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/outlets/${outletId}`
      );

      const responseData = {
        id: response.data.id,
        name: response.data.name,
        lanCode: response.data.lanCode,
        emailAddress: response.data.emailAddress,
        address: response.data.address.name,
        city: response.data.address.city,
        country: response.data.address.country,
      
        state: response.data.address.state,
        zone: response.data.address.name,
        code: response.data.name,
        pincode: response.data.address.pincode,
        contactName: response.data.contactName,
        gpsCoordinates: response.data.gpsCoordinates,
        gpsLink: response.data.gpsLink,
        tmeId: response.data.tmeId,
        tseId: response.data.tseId,
        asmId: response.data.asmId,
        contactNumber: response.data.contactNumber,
      };

      if (responseData) {
        console.log('resData>>>>', responseData);
        setResData(responseData);

        setFormData(responseData); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately
    }
  };

  const handleSave = async () => {
    const validationResult = outletSchema.safeParse(formData);
  
    if (!validationResult.success) {
      // If validation fails, show the errors
      const simplifiedErrors = Object.entries(validationResult.error.flatten().fieldErrors).reduce((acc, [key, value]) => {
        acc[key] = value.join(", ");
        return acc;
      }, {} as Record<string, string>);
  
      setErrors(simplifiedErrors);
      return; // Stop execution if there are validation errors
    }
  
    if (mode === 'edit' && id) {
      // Prepare the data for patching
      const patchData: PatchOperation[] = [];
      Object.entries(formData).forEach(([key, value]) => {
        if (resData[key] !== value) { // Only include fields that have changed
          patchData.push({
            op: 'replace',
            path: `/${key}`,
            value: value,
          });
        }
      });
  
      try {
        const response = await apiService1.patchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/outlets/${id}`,
          patchData
        );
  
        // Handle success response
        console.log('Patch response:', response);
        if (response.statusCode === 200) {
          router.push('/outlet');
        }
        setShowALert(true); // Show success alert
      } catch (error) {
        console.error('Error while saving data:', error);
        // Handle error appropriately
      }
    } else {
      // Handle the 'add' mode case
      // Implement the logic for adding a new outlet
    }
  };
  

  
  // const handleSave = async () => {

  //   const validationResult = outletSchema.safeParse(formData);

    

  //   if (!validationResult.success) {
  //     const simplifiedErrors = Object.entries(validationResult.error.flatten().fieldErrors).reduce((acc, [key, value]) => {
  //       acc[key] = value.join(", "); 
  //       return acc;
  //     }, {} as Record<string, string>);
  
  //     setErrors(simplifiedErrors);
  //     return;
  //   }

  //   if (mode === 'edit') {
  //     const patchArr: { op: string; path: string; value: any }[] = [];
  //     for (const key in resData) {
  //       if (key in formData) {
  //         const formDataKey = key as keyof FormData;
  //         if (resData[formDataKey] !== formData[formDataKey]) {
  //           patchArr.push({
  //             op: 'replace',
  //             path: `${formDataKey}`,
  //             value: formData[formDataKey],
  //           });
  //         }
  //       }
  //     }
  //     console.log('patchArr', patchArr);
  //     // const formPayData = new FormData();
  //     // formPayData.append('id', "6b2212c8-fb6d-42f5-5db4-08dbf7c476fa");
  //     // formPayData.append('body', JSON.stringify(patchArr));
  //     try {
  //       const response = await apiService1.patchData(
  //         `http://4.224.102.99/hiveconnect/requestmanagement/outlets/${id}`,
  //         patchArr
  //       );

  //       console.log('Patch responseee', response);

  //       if (response.statusCode === 200) {
  //         router.push('/outlet');
  //       }
  //       // setShowAlert(true);
  //     } catch (error) {
  //       console.log('Error while saving data:', error);
  //       alert(error);
  //     }
  //     return;
  //   }

  //   const newErrors: FormErrors = { ...errors };
  // let hasError = false;

  // (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
  //   const value = formData[key];
  //   const error = validateField(key, value);

  //   if (error) {
  //     newErrors[key] = error;
  //     hasError = true;
  //   } else {
  //     delete newErrors[key];
  //   }
  // });

  // setErrors(newErrors as Record<string, string>);

  // if (hasError) {
  //   return; // Stop if there are errors
  // }


  //   const data = {
  //     // id: "0c0e0cd9-9c6a-40c7-b05c-9856b39c101c",
  //     name: formData.name,
  //     contactName: formData.contactName,
  //     contactNumber: formData.contactNumber,
  //     emailAddressAddress: formData.emailAddressAddress,
  //     legalName: formData.legalName,
  //     code: 'code',
  //     status: 1,
  //     address: {
  //       name: formData.address,
  //       state: { id: formData.state },
  //       country: { id: formData.country },
  //       city: formData.city,
  //       pincode: formData.pincode,
  //     },
  //     vendors: {
  //       id: formData.vendors,
  //     },
  //     wareHouseType: {
  //       id: formData.wareHouseType,
  //       // name: 'string',
  //     },
  //   };
  //   console.log('Warehouse Data', data);
  //   // eslint-disable-next-line no-constant-condition
  //   if (true) {
  //     try {

  //       const responseData = await apiservice.postData(
  //         'http://4.224.102.99/hiveconnect/requestmanagement/warehouses',
  //         data
  //       );

  //       console.log('Data saved successfully:', responseData);
  //       if (responseData.statusCode === 200) {
  //         router.push('/warehouse');
  //       }
  //       setShowAlert(true);
  //       setFormData(initialFormData); // Reset form if needed
  //     } catch (error) {
  //       console.error('Error saving data:', error);
  //       // Handle error, show user feedback
  //     }
  //   }
  // };

  return (
    <MainLayout>
      <MainHeader pageTitle={'Outlets'}>
        <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Link href="/outlet" className="text-d-none">
            Outlet Master
          </Link>
          <Typography color="text.primary">Update Outlet</Typography>
        </Breadcrumbs>
        {showAlert && (
          <Alert className='custom-alert' icon={<CheckCircleOutline />} severity="success">
            Your outlet has been added to the list.
          </Alert>
        )}
      </MainHeader>

      <Box
        // component="form"
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
                Outlet Information
              </Typography>
              <Typography className='p'>
                Basic information about the Outlet
              </Typography>
            </Grid>
            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={2}
              >
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="name"
                    label="Name"
                    placeholder="Enter Outlet Name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    required={true}
                    onFocus={() => setFocusedField('name')}
                    onBlur={handleBlur}
                    error={!!errors.name} // This line checks if there's an error for 'name'
                    helperText={errors.name || ''} // This line displays the error message
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="lanCode"
                    label="LAN Code"
                    placeholder="Enter LAN Code"
                    // required={true}
                    value={formData.lanCode}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('lanCode')}
                    onBlur={handleBlur}
                    error={!!errors.lanCode} // Check if there's an error for 'lanCode'
                    helperText={errors.lanCode || ''} // Show error message for 'lanCode'
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="gpsCoordinates"
                    label="GPS Coordinates"
                    placeholder="Enter GPS Coordinates"
                    value={formData.gpsCoordinates}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('gpsCoordinates')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.gpsCoordinates} // Check if there's an error for 'gpsCoordinates'
                    helperText={errors.gpsCoordinates || ''} // Show error message for 'gpsCoordinates'
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="gpsLink"
                    label="GPS Link"
                    placeholder="Enter GPS Link"
                    value={formData.gpsLink}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('gpsLink')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.gpsLink} // Check if there's an error for 'gpsLink'
                    helperText={errors.gpsLink || ''} // Show error message for 'gpsLink'
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Address
                    handleFieldChange={handleFieldChange}
                    formData={formData}
                    setFocusedField={setFocusedField}
                    focusedField={focusedField}
                    countries={countries}
                    states={states}
                    errors={errors}
                    validateField={validateField}
                    schema={addressSchema}
                    setErrors={setErrors}
                  />
                </Grid> 
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider className="cust-divider" />
            </Grid>
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography
                component="h3"
                variant="h3"
                className="h3"
              >
                Contact Information
              </Typography>
              <Typography className='p'>
                Contact information of Outlet
              </Typography>
            </Grid>
            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={2}
              >
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="contactName"
                    label="Name"
                    placeholder="Enter Contact Name"
                    value={formData.contactName}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('contactName')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.contactName} // Show error if there's an error message for contactName
                    helperText={errors.contactName} // Display the error message for contactName
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="contactNumber"
                    label="Contact No"
                    placeholder="Enter Contact No"
                    value={formData.contactNumber}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('contactNumber')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.contactNumber} // Display error if there's an error message for contactNumber
                    helperText={errors.contactNumber} // Show the error message for contactNumber
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    name="emailAddress"
                    label="E-mail Address"
                    placeholder="Enter E-mail Address"
                    value={formData.emailAddress}
                    required={true}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('emailAddress')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.emailAddress} // Display error if there's an error message for emailAddress
                    helperText={errors.emailAddress} // Show the error message for emailAddress
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider className="cust-divider" />
            </Grid>
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography
                component="h3"
                variant="h3"
                className="h3"
              >
                Client Information
              </Typography>
              <Typography className='p'>
                Client information of Outlet
              </Typography>
            </Grid>
            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={2}
              >
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <NewSelectOption
                    label={
                      <>
                        TSE Name
                      </>
                    }
                    name="tseId"
                    value={formData.tseId}
                    onChange={(e) =>
                      handleFieldChange({
                        target: { name: 'tseId', value: e.target.value },
                      })
                    }
                    options={tseNames.map((tse) => ({
                      label: tse.name,
                      value: tse.id,
                    }))}
                    className="my-custom-select"
                    onFocus={() => setFocusedField('tseId')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.tseId} // Display error if there's an error message for tseId
                    helperText={errors.tseId} // Show the error message for tseId
                    placeholder='Enter TSE Name'
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <NewSelectOption
                    label={
                      <>
                        TME Name
                      </>
                    }
                    name="tmeId"
                    value={formData.tmeId}
                    onChange={(e) =>
                      handleFieldChange({
                        target: { name: 'tmeId', value: e.target.value },
                      })
                    }
                    options={tmeNames.map((tme) => ({
                      label: tme.name,
                      value: tme.id,
                    }))}
                    className="my-custom-select"
                    onFocus={() => setFocusedField('tmeId')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.tmeId} // Display error if there's an error message for tmeId
                    helperText={errors.tmeId} // Show the error message for tmeId
                    placeholder='Enter TME Name'
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <NewSelectOption
                    label={
                      <>
                        ASM Name
                      </>
                    }
                    name="asmId"
                    value={formData.asmId}
                    onChange={(e) =>
                      handleFieldChange({
                        target: { name: 'asmId', value: e.target.value },
                      })
                    }
                    options={asmNames.map((asm) => ({
                      label: asm.name,
                      value: asm.id,
                    }))}
                    className="my-custom-select"
                    onFocus={() => setFocusedField('asmId')}
                    onBlur={() => setFocusedField(null)}
                    error={!!errors.asmId} // Display error if there's an error message for asmId
                    helperText={errors.asmId} // Show the error message for asmId
                    placeholder='Enter ASM Name'
                  />
                </Grid>
              </Grid>
            </Grid>
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
                type="button"
                sx={{ mr: '10px' }}
                onClick={handleBack}
                // disabled={!isSaveButtonEnabled}
              >
                Back
              </CustomButton>
              <CustomButton
                className="btn btn-black"
                type="button"
                onClick={handleSave}
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

export default OutletUpdate;
