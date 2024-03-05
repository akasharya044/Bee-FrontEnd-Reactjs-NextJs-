/* eslint-disable no-fallthrough */
/* eslint-disable no-useless-escape */
'use client';
import { ApiService } from '../services/api.service';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Breadcrumbs } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Grid, Divider } from '@mui/material';
import MainLayout from './MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import MainHeader from './MainHeader';
import { CustomTextField } from '../../components/TextField/TextField';
import { z } from 'zod';


const isOnlyDigits = (value: string) => /^\d+$/.test(value);

const employeeSchema = z.object({
  name: z.string()
  .min(5, 'Name is required').max(50, ' Name must be 50 characters or less')
  .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: ' Only Alphabets are allowed' }),

  designation: z.string().min(1, 'Designation is required'),
  department: z.string().min(1, 'Department is required'),

  
  // email: z.string().email('Invalid email address').max(50, 'Email must be 50 characters or less'),
  email: z.string()
  .email('Email required',)
  .refine((val) => val === undefined || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
    message: ' Invalid email format',
  }),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string()
  .min(1, 'City is required')
  .max(100, 'City must be 100 characters or less') // Ensure city is no more than 100 characters
  .refine((val) => /^[a-zA-Z\s]+$/.test(val), { message: 'City should only contain alphabets' }),

  address: z.string().max(255, ' Address field should not accept more than 255 characters').optional(),
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
type FormErrors = {
  name?: string[];
  designation?: string[];
  department?: string[];
  contactNo?: string[];
  email?: string[];
  country?: string[];
  state?: string[];
  city?: string[];
  address?: string[];
  pincode?: string[];
};

type TouchedFields = {
  name?: boolean;
  designation?: boolean;
  department?: boolean;
  contactNo?: boolean;
  email?: boolean;
  country?: boolean;
  state?: boolean;
  city?: boolean;
  address?: boolean;
  pincode?: boolean;
};


const EmployeeFrom = () => {
  const router = useRouter();
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [formData, setFormData] = useState<any>({
    // Add the property names and their initial values      // for each field in your form.
    name: '',
    designation: '',
    department: '',
    contactNo: '',
    email: '',
    country: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
    // code:'',
  });
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

  const [showAlert, setShowALert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [country, setCountries] = useState<Country[]>([]);
  const [state, setState] = useState<State[]>([]);
  const [designation, setDesignation] = useState<Designation[]>([]);
  const [department, setDepartment] = useState<Department[]>([]);
  const [resData, setResData] = useState<any>({});
  const [mode, setMode] = useState<string | null>('add');
  const [id, setId] = useState<string | null>('');
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

  const touchAllFields = () => {
    setTouchedFields({
      name: true,
      designation: true,
      department: true,
      contactNo: true,
      email: true,
      country: true,
      state: true,
      city: true,
      address: true,
      pincode: true,
    });

    const result = employeeSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
    }
  };
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [formErrors, setFormErrors] = useState({
    name: '',
    designation: '',
    department: '',
    contactNo: '',
    email: '',
    country: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
 
  

  // const [departmentOptions, setDepartmentOptions] = useState<Array<{ label: string; value: string }>>([]);
  const apiservice = new ApiService();

 
  // const handleFieldChange = (event:any) => {
  //   const { name, value } = event.target;
  //   const updatedFormData = { ...formData, [name]: value };
  //   setFormData(updatedFormData);

  //   if(name == 'country'){
  //     getstateIds(value);
  //   }

  //   const result = employeeSchema.safeParse(updatedFormData);
  //   if (!result.success) {
  //     setErrors(result.error.flatten().fieldErrors);
  //   } else {
  //     setErrors({});
  //   }
  // };

  const handleFieldChange = (event:any) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    if(name == 'country'){
      getstateIds(value);
    }
    setTouchedFields({ ...touchedFields, [name]: true });
  
    const result = employeeSchema.safeParse(updatedFormData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
    }
  };
  
 

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof FormErrors; // Assert the name as a key of FormErrors
    const value = event.target.value;
    
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    const updatedFormData = { ...formData, [name]: value };
    const result = employeeSchema.safeParse(updatedFormData);
    if (!result.success) {
      // If there's an error, update only the error for the specific field
      setErrors(prev => ({ ...prev, [name]: result.error.flatten().fieldErrors[name] }));
    } else {
      // If the field is now valid, remove the error for the specific field
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  

  const getValueFromSessionStorage = () => {
    const storedValue = sessionStorage.getItem('employeeId');
    return storedValue || '';
  };
  useEffect(() => {
    // const formIsValid = isFormValid();
    setSaveButtonEnabled(isFormValid);
  }, []);

  const handleSave = async () => {
    
    touchAllFields(); // Touch all fields to trigger validation

    const result = employeeSchema.safeParse(formData);
    if (!result.success) {
   
      return;
    }

    
    if (mode === 'edit') {
      const patchArr: { op: string; path: string; value: string }[] = [];
      for (const key in resData) {
        if (resData[key] !== formData[key]) {
          patchArr.push({
            op: 'replace',
            path: `${key}`,
            value: formData[key],
          });
        }
      }
      try {
        const response = await apiservice.patchData(
          `http://20.219.172.254/hiveconnect/accounts/clientemployee/${id}`,
          patchArr
        );

        if (response.statusCode === 200) {
          router.push('/employee');
        }
        setShowALert(true);
      } catch (error) {
        alert(error);
      }
      return;
    }

    const data = {
      name: formData.name,
      // lanCode: formData.laneCode,
      // code: 'formData.code',
      email: formData.email,
      contactNo: formData.contactNo,
      designation: { id: formData.designation },
      department: { id: formData.department },
      address: {
        name: formData.address,
        state: {
          id: formData.state,
        },
        country: {
          id: formData.country,
        },
        city: formData.city,
        pincode: formData.pincode,
      },
    };
    try {
      const response = await apiservice.postData(
        'http://20.219.172.254/hiveconnect/accounts/clientemployee',
        data
      );
      if (response.statusCode === 200) {
        router.push('/employee');
      }
      setShowALert(true);
    } catch (error) {
    
      alert(error);
    }
  };

  const handleBack = () => {
    router.push('/employee');
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
    getdesignationIds();
    getdepartmentIds();
    getValueFromSessionStorage();
    const storedValue = getValueFromSessionStorage();
    if (storedValue) {
      setMode('edit');
      setId(storedValue);
      handleGetBYId(storedValue);
    }
    return () => {
      sessionStorage.removeItem('employeeId');
    };
    // fetchData();
  }, []);
  useEffect(() => {
    // Cast router to any to bypass TypeScript error
    const query = (router as any).query;
    const isAddingNewEmployee = query && query.new;

    if (isAddingNewEmployee) {
      // Reset the form fields
      setFormData({
        name: '',
        designation: '',
        department: '',
        contactNo: '',
        email: '',
        country: '',
        city: '',
        state: '',
        address: '',
        pincode: '',
      });

      // Clear any cached data related to the employee form
      sessionStorage.removeItem('employeeId');
    }

    // ... rest of your useEffect logic
  }, [(router as any).query]); // Use the casted query as a dependency

  const handleGetBYId = async (id: any) => {
   
    try {
      
      const response = await apiservice.fetchData(
        `http://20.219.172.254/hiveconnect/accounts/clientemployee/employee/${id}`
      );
     
      const responseData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        address: response.data.address.name,
        city: response.data.address.city,
        country: response.data.address.country.id,
        state: response.data.address.state.id,
        pincode: response.data.address.pincode,
        // contactName: response.data.contactName,
        designation: response.data.designation,
        department: response.data.department,
        contactNo: response.data.contactNo,
        pinCode: response.data.pincode,
      };

      if (responseData) {
       
        await getstateIds(responseData.country);
        setResData(responseData);
        setFormData(responseData); // alert(JSON.stringify(newData)); // Show data in alert as JSON string
      }
    } catch (error) {
     
    }
  };

  const getstateIds = async (value:any) => {
    const apiService = new ApiService();
    try {
      

      const response = await apiService.fetchData(
        `http://20.219.214.84/hiveconnect/common/state/country/${value}`
      );

      
      if (response.statusCode === 200) {
        
        
        setState(response.data); // <-- Should be setStates instead of setCountries
       
      } else {
       
      }
    } catch (error) {
      
    }
  };

  const getdesignationIds = async () => {
    const apiService = new ApiService();
    try {
     
      const response = await apiService.fetchData(
        'http://20.219.172.254/hiveconnect/accounts/Designation/designations'
      );

    
      if (response.statusCode === 200) {
       
        setDesignation(response.data);
        
      } else {
        
      }
    } catch (error) {
     
    }
  };

  const getdepartmentIds = async () => {
    const apiService = new ApiService();
    try {
     
      const apiUrl =
        'http://20.219.172.254/hiveconnect/accounts/Department/departments';
      const response = await apiservice.fetchData(apiUrl);
     
      if (response.statusCode === 200) {
        
        setDepartment(response.data);
        
      } else {
        
      }
    } catch (error) {
      
    }
  };

  return (
    <MainLayout>
      <MainHeader
        pageTitle={'Employee'}
        showAlert={showAlert}
        alertMsg={'Your employee has been added to the list.'}
      >
        {/* <Typography component="p" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home {'&nbsp;'}
          </Link>
          /{' '}
          <Link href="employee" className="text-d-none">
            Employee Management
          </Link>{' '}
          / Add New Employee
        </Typography> */}
        <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Link href="employee" className="text-d-none">
            Employee Management
          </Link>
          <Typography color="text.primary">Add New Employee</Typography>
        </Breadcrumbs>
      </MainHeader>

      <Box
        // component="form"
        className="input-form page-padding-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <Box component="div" className="form-body">
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
          >
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography component="h3" variant="h3" className="h3">
                Basic Information
              </Typography>
              <Typography className='p'>
                Basic information about the employee
              </Typography>
            </Grid>
            {/* Replace this section with your form fields */}

            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    required={true}
                    error={Boolean(touchedFields.name && errors.name && errors.name.length > 0)}
                    helperText={touchedFields.name && errors.name ? errors.name.join(", ") : ''}
                    
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <NewSelectOption
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    required={true}
                    error={Boolean(touchedFields.designation && errors.designation)}
                    helperText={touchedFields.designation && errors.designation ? errors.designation.join(", ") : ''}
                    options={[
                      { label: 'Select Designation', value: '' },
                      ...designation.map((d) => ({
                        label: d.name,
                        value: d.id,
                      })),
                    ]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <NewSelectOption
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    required={true}
                    error={Boolean(touchedFields.department && errors.department)}
                    helperText={touchedFields.department && errors.department ? errors.department.join(", ") : ''}
                    options={[
                      { label: 'Select Department', value: '' },
                      ...department.map((d) => ({
                        label: d.name,
                        value: d.id,
                      })),
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Divider className="cust-divider" />
            </Grid>
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography component="h3" variant="h3" className="h3">
                Contact Information
              </Typography>
              <Typography className='p'>
                Contact Details of the employee
              </Typography>
            </Grid>
            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="contactNo"
                    label="Contact Number"
                    placeholder="Enter Number"
                    value={formData.contactNo}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    required={true}
                    error={Boolean(touchedFields.contactNo && errors.contactNo)}
                    helperText={touchedFields.contactNo && errors.contactNo ? errors.contactNo.join(", ") : ''}
                  />          
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="email"
                    label="Email Address"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    required={true}
                    error={Boolean(touchedFields.email && errors.email)}
                    helperText={touchedFields.email && errors.email ? errors.email.join(", ") : ''}
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
                        onBlur={handleBlur}
                        error={Boolean(touchedFields.address && errors.address)}
                        helperText={touchedFields.address && errors.address ? errors.address.join(", ") : ''}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>  
                      <NewSelectOption
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleFieldChange}
                        onBlur={handleBlur}
                        required={true}
                        error={Boolean(touchedFields.country && errors.country)}
                        helperText={touchedFields.country && errors.country ? errors.country.join(", ") : ''}
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
                        onBlur={handleBlur}
                        required={true}
                        error={Boolean(touchedFields.state && errors.state)}
                        helperText={touchedFields.state && errors.state ? errors.state.join(", ") : ''}
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
                        onBlur={handleBlur}
                        required={true}
                        error={Boolean(touchedFields.city && errors.city)}
                        helperText={touchedFields.city && errors.city ? errors.city.join(", ") : ''}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <CustomTextField
                        name="pincode"
                        label="Pincode"
                        placeholder="Enter Pincode"
                        value={formData.pincode}
                        onChange={handleFieldChange}
                        onBlur={handleBlur}
                        required={true}
                        error={Boolean(touchedFields.pincode && errors.pincode)}
                        helperText={touchedFields.pincode && errors.pincode ? errors.pincode.join(", ") : ''}
                      />
                    </Grid>
                  </Grid>
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
              // className='button-div-bottom'
            >
              <CustomButton
                className="btn btn-outline"
                variant="outlined"
                sx={{ marginRight: '10px' }}
                onClick={handleBack}
              >
                Back
              </CustomButton>
              <CustomButton
                type="submit"
                onClick={handleSave}
                className="saveButton btn btn-black"
                // disabled={isFormValid}
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

export default EmployeeFrom;