'use client'
import { Button, Breadcrumbs, Box, Typography, Grid, Alert } from '@mui/material';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import MainLayout from '../MainLayout';
import VendorBasic from './vendorBasic';
import VendorDocs from './vendorDocs';
import { ApiService } from '../../services/api.service';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import MainHeader from '../MainHeader';
import { CheckCircleOutline } from '@mui/icons-material';

interface States {
  id: string;
  name: string;
}
interface Activity {
  id: string;
  name: string;
}

interface Country {
  id: string;
  name: string;
}
interface FormData {
  [key: string]: any; // Adjust the 'any' to be more specific if possible
}

const VendorUpdate = (props:any) => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showVendor, setVendor] = useState(false);
  // const [formData, setFormData] = useState({}); // Add a state to store overall form data
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  

  const [formData, setFormData] = useState<any>({
    name: '',
    contactNumber: '',
    emailAddress: '',
    pocName: '',
    pocContactNumber: '',
    countryId: '',
    countryId1: '',
    stateId: '',
    city: '',
    city1: '',
    state: '',
    state1: '',
    pincode: '',
    pincode1: '',
    gstNumber: '',
    gstregisteredaddressline: '',
    panno: '',
    msmeRegNo: '',
    activityId: [],
    address: '',
    address1: '',
    code: '',
    zone: '',
    billingaddressline1: '',
    billingaddressline2: '',
    legalEntity: '',
    sfa: '',
    days: '',
  });
  const [selectedValue, setSelectedValue] = useState<any[]>([]);
  const [id, setId] = useState<string | null>('');
  const [mode, setMode] = useState<string>('add');
  const [resData, setResData] = useState<any>({});
  const [showAlert, setShowAlert] = useState(false);
  const [states, setStates] = useState<States[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState('');
  const apiService = new ApiService();

  const allowedFileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/pdf', 
    'image/jpeg', 
  ];
  const formDataSchema = z.object({
    name: z.string().min(1, { message: "Name is required" })
    .max(50, ' Name must be 50 characters ')
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' Only Alphabets are allowed' }),
    contactNumber: z.string()
    .min(1,'Contact Number is required')
      .regex(/^\d{1,10}$/, { message: "Contact Number should consist only number, max 10 digit" }),
    emailAddress: z.string()
    .min(1,'Email required',)
    .max(50, ' Email must be 50 characters ')
    .email('Invalid email format'),
    billingaddressline1:z.string().min(1, "Billing address required")
    .max(255, ' Address field should not accept more than 255 characters'),
    legalEntity: z.string().min(1, { message: "Legal Entity Name is required" }),
    pocName: z.string().min(1, { message: "POC Name is required" }),
    pocContactNumber: z.string()
      .min(1, "POC Contact Number required")
      .regex(/^\d{1,10}$/, { message: "Contact Number should consist only number, max 10 digit" }),
      countryId: z.string().min(1, { message: "Country is required" }),
    countryId1: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1,'State/County is required'),
    state1: z.string().min(1,'State/County is required'),
    city: z.string().min(1, { message: "City is required" })
    .max(50, ' Name must be 50 characters '),
    city1: z.string().min(1, { message: "City is required" })
    .max(50, ' Name must be 50 characters '),
    pincode: z.string()
    .min(1,'Pincode is required')
    .refine((val) => /^\d{1,6}$/.test(val), { message: 'Pincode must be exactly 6 digits' }),
    pincode1: z.string()
    .min(1, 'Pincode is required') 
  .refine((val) => /^\d{6}$/.test(val), { message: 'Pincode must be exactly 6 digits' }),
    gstNumber: z.string()
    .min(1, "GST number is required")
    .length(15, "GSTIN must be 15 characters long")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, "Invalid GSTIN format"),
    gstregisteredaddressline:z.string().min(1,"GST Registred Address required")
    .max(255, ' Address field should not accept more than 255 characters'),
    panno: z.string()
    .min(1,"Pan No. is required")
    .length(10, "PAN must be exactly 10 characters long")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/,{ message: "Invalid PAN format",}),
    msmeRegNo: z.string().min(1,"MSME Reg No. is required")
    .max(15,"Maxlength 15 digits")
    .regex(/^[A-Za-z0-9]+$/, "MSME Reg No. must be alphanumeric without special characters")
    .refine(val => /^[A-Z0-9]+$/i.test(val), { message: "MSME Reg No. must be alphanumeric and case-insensitive" }),
    activityId: z.array(z.string()).min(1, { message: "At least one activity is required" }),
   
  });

  const validateField = (name: string | number, value: any) => {
    const singleFieldSchema = formDataSchema.pick({ [name]: true });
    const validationResult = singleFieldSchema.safeParse({ [name]: value });
    if (!validationResult.success) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationResult.error.issues[0].message,
      }));
    } else {
    
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  useEffect(() => {
    getcountryIds();
    getstateIds();
    getactivityIds();
    const storedValue = props.vendorId;
    if (storedValue) {
      setMode('edit');
      setId(storedValue);
      handleGetBYId(storedValue);
    }
    // return () => {
    //   sessionStorage.removeItem('vendorId');
    // };
  }, []);

  const updateFormData = (updatedData: { uploadedDocuments: File[] }) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...updatedData, 
    }));

  };

  const getcountryIds = async () => {
    const apiService = new ApiService();
    try {
      const response = await apiService.fetchData(
        'http://20.219.214.84/hiveconnect/common/country'
      );

      if (response.statusCode === 200) {
        // Assuming your response data is an array of market objects
        setCountries(response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };
  const getstateIds = async () => {
    const apiService = new ApiService();
    try {
      const response = await apiService.fetchData(
        'http://20.219.214.84/hiveconnect/common/state'
      );
      if (response.statusCode === 200) {
        setStates(response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };
  const getactivityIds = async () => {
    const apiService = new ApiService();
    try {
      const response = await apiService.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/activity/lookup'
      );
      // setActivity(response.data);
      setActivity(response.data.map((item: { id: any; name: any; }) => ({ id: item.id, name: item.name })));

      if (response.statusCode === 200) {
        console.log("")
      } else {
        //console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  const handleGetBYId = async (vendorId: any) => {
    try {
      const response = await apiService.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/vendors/${vendorId}`
      );


      // const activityIds = response.data.activities.map((activity) => activity.id);
      const activities = response.data.activities || [];
  
      const activityIds = activities.map((activity: { id: any; }) => activity.id.toUpperCase());
      const responseData = {
        name: response.data.name,
        contactNumber: response.data.contactNumber,
        emailAddress: response.data.pocEmailAddress,
        pocName: response.data.pocName,
        pocContactNumber: response.data.pocContactNumber,
        countryId: response.data.gstRegisteredAddress.country,
        countryId1: response.data.billingAddress.country,
        city: response.data.gstRegisteredAddress.city,
        state: response.data.gstRegisteredAddress.state,
        state1: response.data.billingAddress.state,
        pincode: response.data.billingAddress.pincode,
        city1: response.data.billingAddress.city,
        pincode1: response.data.gstRegisteredAddress.pincode,
        gstNumber: response.data.gstNumber,
        gstregisteredaddressline: response.data.gstRegisteredAddress.name,
        panno: response.data.panno,
        msmeRegNo: response.data.msmeRegNo,
        
        activityId: activityIds,
        // activityId: response.data.activities.map(activity => activity.name),
        code: response.data.code,
        billingaddressline1: response.data.billingAddress.name,
        legalEntity: response.data.legalEntity,
        sfa: response.data.paymentTerms[0]?.sfa,
        days: response.data.paymentTerms[0]?.days,
      };
     

      if (responseData) {
        setResData(responseData);

        setFormData(responseData); // alert(JSON.stringify(newData)); // Show data in alert as JSON string
      }
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };
  
  const handleSave = async () => {
    
    const validationResult = formDataSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.reduce<Record<string, string>>((acc, issue) => {
        const key = issue.path[0];
        if (typeof key === "string") {
          acc[key] = issue.message;
        }
        return acc;
      }, {});
      setValidationErrors(errors);
      return;
    }
  
    if (mode === 'edit') {
   
    //   const patchArr = Object.keys(formData).reduce<{ op: string; path: string; value: any; }[]>((acc, key) => {
    //     const formattedPath = `/${key.replace(/\./g, '/')}`;
    //     if (JSON.stringify(resData[key]) !== JSON.stringify(formData[key])) {
    //         acc.push({
    //             op: 'replace',
    //             path: formattedPath,
    //             value: formData[key],
    //         });
    //     }
    //     return acc;
    // }, []);

    const patchArr: { op: string; path: string; value: any }[] = [];
    for (const key in resData) {
      if (key in formData) {
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
  
      if (patchArr.length === 0) {
        console.log("No changes to save.");
        return;
      }
  
      try {
        const response = await fetch(`http://4.224.102.99/hiveconnect/requestmanagement/vendors/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json-patch+json',
            'tenant':'HC_1'
           
          },
          body: JSON.stringify(patchArr),
        });
  
        const responseData = await response.json();
         
     
        if (response.ok) {
          // router.push('/vendor');
          setShowAlert(true)
        } else {
          alert(`Failed to update data: ${responseData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error while saving data:', error);
        // alert(`Error while saving data: ${error.message}`);
      }
    }
  };
  
  

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);

  };

  useEffect(() => {
    const formIsValid = isFormValid();
    setSaveButtonEnabled(formIsValid);
  }, [formData]);
  const handleSelectChange = (event: any) => {
    // const {
    //   target: { value },
    // } = event;
    // setSelectedValue(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    setSelectedValue(event.target.value);
  };

  const isFormValid = () => {
    // Implement your validation logic here
    if (
      formData.name &&
      formData.activityId &&
      formData.contactNumber &&
      formData.emailAddress &&
      formData.pocName &&
      formData.pocContactNumber &&
      formData.countryId &&
      formData.countryId1 &&
      formData.stateId &&
      formData.city &&
      formData.city1 &&
      formData.pincode &&
      formData.gstNumber &&
      formData.panno &&
      formData.msmeRegNo &&
      formData.billingaddressline1 &&
      formData.billingaddressline2 &&
      formData.state &&
      formData.state1 &&
      formData.address &&
      formData.zone &&
      formData.legalEntity &&
      formData.gstregisteredaddressline
      // formData.sfa &&
      // formData.days
    ) {
      return true;
    }
    return false;
  };

  const handleBack = () => {
    router.push('/vendor');
  };

  return (
    <MainLayout>
      {/* <Box className="white-box">
        <Typography component="p" className="m-0 text-dark breadcrumb-text">
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            {' '}
            Home{' '}
          </Link>
          <Link href="/vendor" style={{ textDecoration: 'none' }}>
            {' '}
            / Vendor Master{' '}
          </Link>{' '}
          / Update Vendor
        </Typography>
        {showAlert && (
          <Alert className='custom-alert' icon={<CheckCircleOutline />} severity="success">
            Vender Updated successfully.
          </Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: '10px',
          }}
        >
          <Typography
            component="h3"
            variant="h3"
            className="h3 page-heading-text"
            sx={{ mt: '15px' }}
          >
            Vendor
          </Typography>
        </Box>
      </Box> */}
      <MainHeader
        pageTitle={'Vendor'}
      >
        <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Link href="/vendor" className="text-d-none">
            Vendor Master
          </Link>
          <Typography color="text.primary">Update Vendor</Typography>
        </Breadcrumbs>
        {showAlert && (
          <Alert className='custom-alert' icon={<CheckCircleOutline />} severity="success">
            Vender Updated successfully.
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
          <VendorBasic
            handleFieldChange={handleFieldChange}
            formData={formData}
            setFocusedField={setFocusedField}
            focusedField={focusedField}
            states={states}
            countries={countries}
            activity={activity}
            mode={mode}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            handleSelectChange={handleSelectChange}
            validationErrors={validationErrors}
            validateField={validateField}
          />
          <VendorDocs
            handleFieldChange={handleFieldChange}
            formData={formData}
            setFocusedField={setFocusedField}
            focusedField={focusedField}
            updateFormData={updateFormData}
          />
          <Grid item>
            <Box className="justifyend" sx={{ gap: '15px' }}>
              <Button className="btn btn-outline" variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                className="btn btn-black"
              >
                Save
              </Button>
            </Box>
          </Grid>
          </Grid>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default VendorUpdate; 