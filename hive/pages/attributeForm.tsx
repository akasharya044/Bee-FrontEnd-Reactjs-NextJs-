'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Alert, Breadcrumbs } from '@mui/material';
import { CustomTextField } from '../../components/TextField/TextField';
import CustomButton from '../../components/CustomButton/CustomButton';
import MainLayout from './MainLayout';
import Link from 'next/link';
import '../styles/global.css';
import '../styles/style.css';
import { useRouter } from 'next/navigation';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import { ApiService } from '../services/api.service';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MainHeader from './MainHeader';
import { CheckCircleOutline } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { z } from 'zod';
import NewSelectAutocomplete from '../../components/Multselectoption/NewSelectAutocomplete';

const groupingRegex = /^[A-Za-z\s]+$/;
const descriptionRegex = /^[A-Za-z0-9\s.,;:'"!?()-]+$/;

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, ' Name must be 50 characters or less')
    .regex(/^[A-Za-z\s]+$/, 'Name must only contain letters and spaces.'),

  groupName: z
    .string()
    .min(1, 'Group Name is required')
    .max(50, 'Group Name must be 50 characters or less')
    .regex(groupingRegex, 'Group Name must only contain letters and spaces.'),

  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, ' Description should not accept more than 255 characters')

    .regex(
      descriptionRegex,
      'Description must only contain letters and spaces.'
    ),

  // dataType: z.string().min(1, 'Data Type is required'),

 // Adjust the validation for unitOfMeasurement to expect an array of strings
unitOfMeasurement: z.array(z.string().min(1, 'At least one Unit of Measurement is required')),


  applicableValues: z
    .string()
    .min(1, 'Applicable Values are required')
    .regex(/^[\d,.]+$/, 'Applicable Values must only contain digits.'),
});

export interface Country {
  id: string;
  name: string;
}
interface UnitOfMeasurement {
  id: string;
  name: string;
}
interface FormData {
  name: string;
  groupName: string;
  description: string;
  dataType: string;
  unitOfMeasurement: string[];
  applicableValues: string;
}




interface FormErrors {
  [key: string]: string | undefined;
  name?: string | undefined;
  groupName?: string | undefined;
  description?: string | undefined;
  dataType?: string | undefined;
  unitOfMeasurement?: string | undefined;
  applicableValues?: string | undefined;
}

const AttributeForm = () => {
  const router = useRouter();
  const [dataType, setDataType] = React.useState('');
  const [unitsOfMeasurement, setUnitsOfMeasurement] = useState<
    UnitOfMeasurement[]
  >([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    groupName: '',
    description: '',
    dataType: '',
    unitOfMeasurement: [],
    applicableValues: '',
  });

  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});



  const apiService = new ApiService();
  const [success, setSuccess] = useState({ show: false, message: '' });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowALert] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  type FormDataKey = keyof FormData;

  // Define a type for the values of FormData
  type FormDataValue = FormData[FormDataKey];
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const target = event.target as HTMLInputElement; // Ensures that target is treated as an input element
    if (!target) {
      console.error('Event target is undefined.');
      return;
    }

    const name = target.name;
    const value = target.value;

    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value, // No need for casting as we're dealing with HTMLInputElement
      }));
    } else {
      console.error('The form element does not have a name attribute.');
    }
  };

  const handleUnitOfMeasurementChange = (
    event: SelectChangeEvent<string | string[]>
  ) => {
    // Extract the value from the event.
    // Note: You might need to adjust this part based on how your custom component passes its value.
    let value = event.target.value;

    // Convert a string to an array if necessary
    if (typeof value === 'string') {
      value = [value];
    }

    // Update the state.
    setFormData((prevFormData) => ({
      ...prevFormData,
      unitOfMeasurement: event.target.value as string[], // Cast 'value' as a string array
    }));
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await apiService.fetchUnitsOfMeasurement(
          '/hiveconnect/configuration/unitofmeasurement/lookup'
        );
        if (response && Array.isArray(response.data)) {
          setUnitsOfMeasurement(response.data);
        } else {
          // Handle the case where data is not in the expected format
          console.error('Unexpected format for units of measurement', response);
          setUnitsOfMeasurement([]);
        }
      } catch (error) {
        console.error('Error fetching units of measurement:', error);
        setUnitsOfMeasurement([]);
      }
    };

    fetchUnits();
  }, []);





  const handleSave = async () => {
    // Validate form data using Zod schema
    const validationResult = formSchema.safeParse(formData);
  
    // If validation fails, set the form errors
    if (!validationResult.success) {
      const zodErrors:any = validationResult.error.flatten();
      const updatedErrors: FormErrors = Object.keys(zodErrors.fieldErrors).reduce((acc, key) => {
        const errorMessages = zodErrors.fieldErrors[key];
        if (errorMessages) {
          acc[key as keyof FormErrors] = errorMessages[0]; // Cast key as keyof FormErrors
        }
        return acc;
      }, {} as FormErrors);
  
      setFormErrors(updatedErrors);
      return; // Exit early if there are validation errors
    }
  
    // Reset formErrors if the form is valid
    setFormErrors({});
  
    // Map the unit of measurement names to their IDs
    const unitOfMeasurementIds = formData.unitOfMeasurement.map((unitName) =>
      unitsOfMeasurement.find((unit) => unit.name === unitName)?.id
    );
  
    // Ensure all unit IDs are valid
    if (unitOfMeasurementIds.includes(undefined)) {
      console.error('One or more unit of measurement IDs are invalid.');
      setAlertMessage('One or more unit of measurement IDs are invalid.');
      setShowALert(true);
      return; // Stop the function if any unit IDs are invalid
    }
  
    // Construct the request body
    const requestBody = {
      name: formData.name.trim(),
      groupName: formData.groupName.trim(),
      description: formData.description.trim(),
      dataType: parseInt(formData.dataType), // Assuming dataType in formData is a string that needs to be converted to a number
      unitOfMeasurements: formData.unitOfMeasurement.map((unitName) => {
        // Find the full unit object by name, or default to null if not found
        const unit = unitsOfMeasurement.find((unit) => unit.name === unitName) || null;
        return unit ? { id: unit.id, name: unit.name } : null;
      }).filter(Boolean), // Filter out any null entries
      applicableValues: formData.applicableValues
    };
  
    try {
      const response = await apiService.postData('http://20.207.68.38/hiveconnect/configuration/attributes', requestBody);
  
      if (response.statusCode === 200 || response.status === 200) {
        setSuccess({ show: true, message: 'Attribute Updated successfully.' });
      
        setTimeout(() => {
          setSuccess({ show: false, message: '' });
          router.push('/attribute'); // Navigate after the alert is hidden
        }, 2000);
      }
       else {
        setAlertMessage('Failed to save attribute. Please try again.');
        setShowALert(true);
      }
    } catch (error) {
      setAlertMessage('Failed to save attribute. Please try again.');
      setShowALert(true);
    }
  };

  

  const isFormValid = () => {
    const requiredFields: FormDataKey[] = [
      'name',
      'groupName',
      'description',
      'dataType',
      'unitOfMeasurement',
      'applicableValues',
    ];

    return requiredFields.every((field) => {
      const value = formData[field];

      if (typeof value === 'string') return value.trim() !== '';

      if (Array.isArray(value)) return value.length > 0;

      return value != null;
    });
  };

  useEffect(() => {
    setSaveButtonEnabled(isFormValid());
  }, [formData]);

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    const validationResult = formSchema.safeParse(updatedFormData);

    if (!validationResult.success) {
      const updatedErrors = validationResult.error.flatten().fieldErrors;
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...Object.keys(updatedErrors).reduce((acc, key) => {
          if (key in prevErrors) {
            // This checks if the key is actually a key of FormErrors
            const value = updatedErrors[key as keyof typeof updatedErrors];
            if (value && value.length > 0) {
              acc[key as keyof FormErrors] = value[0] || '';
            }
          }
          return acc;
        }, {} as FormErrors),
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }

    setFormData(updatedFormData);
  };

  const handleapplicableValuesChange = (event: any) => {
    // You may want to add validation or processing logic here
    setFormData({
      ...formData,
      applicableValues: event.target.value,
    });
  };

  const handleBack = () => {
    router.push('/attribute');
  };

  return (
    <MainLayout>
      <MainHeader pageTitle={'Attribute'}>
        <Breadcrumbs
          aria-label="breadcrumb"
          className="text-dark breadcrumb-text"
        >
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Link href="/attribute" className="text-d-none">
            Attribute Master
          </Link>
          <Typography color="text.primary">Add New Attribute</Typography>
        </Breadcrumbs>
        {success.show && (
          <Alert
            className="custom-alert"
            severity="success" // This makes the alert green
          >
            {success.message}
          </Alert>
        )}
      </MainHeader>
      <Box className="input-form outletform-box page-padding-container">
        <Box component="div" className="form-body">
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography component="h3" variant="h3" className="h3">
                Attribute Information
              </Typography>
              <Typography className="p">Attribute Information</Typography>
            </Grid>

            <Grid item lg={9} md={8.5} sm={12} xs={12}>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="name"
                    label="Name"
                    placeholder="Enter Attribute Name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    required={true}
                    error={!!formErrors.name}
                    helperText={formErrors.name || ''}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="groupName"
                    label="Grouping"
                    placeholder="Enter Attribute groupName"
                    value={formData.groupName}
                    onChange={handleFieldChange}
                    required={true}
                    onFocus={() => setFocusedField('code')}
                    onBlur={() => setFocusedField(null)}
                    error={!!formErrors.groupName}
                    helperText={formErrors.groupName || ''}
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                 
<NewSelectAutocomplete
  label="Applicable Unit of Measurement"
  name="unitOfMeasurement"
  placeholder="Select Unit of Measurement"
  value={formData.unitOfMeasurement.map((name) => 
    unitsOfMeasurement.find((unit) => unit.name === name) || {} // Map names back to unit objects
  )}
  onChange={(event, newValue) => {
    // Map selected units back to their names for formData
    const newUnitNames = newValue.map((item:any) => item?.name);
    const mockEvent = {
      target: {
        name: "unitOfMeasurement",
        value: newUnitNames,
      },
    } as unknown as SelectChangeEvent<string[]>;
    handleUnitOfMeasurementChange(mockEvent);
  }}
  required={true}
  options={unitsOfMeasurement} // Provide all units as options
  sx={{ maxWidth: '100%', background: 'white', color: 'blue' }}
  className="my-custom-select"
  onFocus={() => setFocusedField('unitOfMeasurement')}
  // ... any other props your NewSelectAutocomplete component may need
/>


                </Grid>

                
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="applicableValues"
                    label="Applicable Values"
                    placeholder="Enter values separated by commas"
                    value={formData.applicableValues}
                    onChange={handleapplicableValuesChange}
                    required={true}
                    error={!!formErrors.applicableValues}
                    helperText={formErrors.applicableValues || ''}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <CustomTextField
                    name="description"
                    label="Description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleFieldChange}
                    required={true}
                    error={!!formErrors.description}
                    helperText={formErrors.description || ''}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl
                    className="cust-form-control w-100"
                    variant="filled"
                    required
                    fullWidth
                    error={!!formErrors.dataType}
                  >
                    <InputLabel id="data-type-select-label">
                      Data Type
                    </InputLabel>
                    <Select
                      labelId="data-type-select-label"
                      id="data-type-select"
                      placeholder="Select Data type" // Set the placeholder here
                      value={formData.dataType}
                      label="Data Type"
                      onChange={handleChange}
                      name="dataType"
                      error={!!formErrors.dataType}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Data Type</em>
                      </MenuItem>
                      <MenuItem value={1}>Text</MenuItem>
                      <MenuItem value={2}>Numeric</MenuItem>
                      <MenuItem value={3}>Alpha-Numeric</MenuItem>
                      <MenuItem value={4}>Dropdown</MenuItem>
                    </Select>
                    {/* {!!formErrors.dataType && (
                      <FormHelperText>{formErrors.dataType}</FormHelperText>
                    )} */}
                  </FormControl>
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
                // disabled={!isSaveButtonEnabled} // Make sure this reflects the correct state
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

export default AttributeForm;