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
import {Loader} from '../../components/Loader/Loader'
import { z } from 'zod';
import NewSelectAutocomplete from '../../components/Multselectoption/NewSelectAutocomplete';


type PatchOperation = {
  op: string;
  path: string;
  value: any; // Consider using a more specific type if possible
};

export interface Country {
  id: string;
  name: string;
}
interface UnitOfMeasurement {
  name: string;
  id: string;
}
interface FormData {
  name: string;
  groupName: string;
  description: string;
  dataType: string;
  unitOfMeasurement: any[];
  applicableValues: string;
  [key: string]: string | string[];
}
interface FormErrors {
  name?: string;
  groupName?: string;
  description?: string;
  dataType?: string;
  unitOfMeasurement?: any; // or string[] if your error state needs to accommodate multiple values
  applicableValues?: string;
}

const AttributeUpdate = (props:any) => {
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
    applicableValues: ''
  });
  const [resData, setResData] = useState<any>({});

  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const nameRegex = /^[a-zA-Z\s]*$/; // Allows letters and spaces
  const groupingRegex = /^[a-zA-Z\s]*$/; // Allows letters and spaces
  const descriptionRegex = /^[a-zA-Z\s]*$/;

  const apiService = new ApiService();
  const [success, setSuccess] = useState({ show: false, message: '' });
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
  const [alertMessage, setAlertMessage] = useState('');
  const [id, setId] = useState<string | null>('');

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleUnitOfMeasurementChange = (
    event: SelectChangeEvent<string | string[]>
  ) => {
    let value = event.target.value;

    // Convert a string to an array if necessary
    if (typeof value === 'string') {
      value = [value];
    }

    // Update the state.
    setFormData((prevFormData) => ({
      ...prevFormData,
      unitOfMeasurement: value as string[], // Cast 'value' as a string array
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
  const attributeSchema = z.object({
    name: z
      .string()
      .min(1, 'Input data')
      .max(50)
      .regex(nameRegex, 'Invalid input: Only letters and spaces allowed'),
    groupName: z
      .string()
      .max(50)
      .optional()
      .refine((val) => val === undefined || groupingRegex.test(val), {
        message: 'Invalid input: Only letters and spaces allowed',
      }),
    dataType: z.enum(['Text', 'Numeric', 'Alpha-Numeric', 'Dropdown']),

    description: z
      .string()
      .max(50)
      .optional()
      .refine((val) => val === undefined || descriptionRegex.test(val), {
        message: 'Invalid input: Only letters and spaces allowed',
      }),

    unitOfMeasurement: z
      .array(z.string())
      .min(1, 'Applicable unit of measurement is required'), // Ensure it's not empty

    applicableValues: z
      .string()
      .max(50)
      .optional()
      .refine(
        (val) =>
          val === undefined ||
          (val.includes(',') && /^[a-zA-Z0-9,]*$/.test(val)),
        {
          message:
            'Invalid format: Use commas to separate values without special characters.',
        }
      ),
  });

  useEffect(()=>{
    const storedValue = props.attributeId;
    if (storedValue) {
      setMode('edit');
      setId(storedValue);
      handleGetById(storedValue);
    }
    // return () => {
    //   sessionStorage.removeItem('vendorId');
    // };
  }, []);



const handleGetById = async (attributeId: any) => {
  try {
    const response = await apiService.fetchData(
      `http://20.207.68.38/hiveconnect/configuration/attributes/${attributeId}`
    );

    if (response.statusCode === 200 && response.data) {
      const data = response.data;
      // Map through the unitOfMeasurements to get the names instead of the ids
      const unitOfMeasurementNames = data.unitOfMeasurements.map((unit: { name: any; }) => unit.name);
      
      const responseData = {
        name: data.name,
        groupName: data.groupName,
        description: data.description,
        dataType: data.dataType,
        applicableValues: data.applicableValues,
        // Store the names in the state
        unitOfMeasurement: unitOfMeasurementNames,
      };

      console.log("line 220", responseData.dataType); // Check the fetched dataType value


      setFormData(responseData);
      setResData(responseData);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



  const handleSave = async () => {
    if (mode === 'edit' && id) {
      const patchArr: PatchOperation[] = Object.keys(formData).reduce((acc, key) => {
        if (JSON.stringify(formData[key]) !== JSON.stringify(resData[key])) {
          const patch: PatchOperation = {
            op: 'replace',
            path: `/${key}`,
            value: formData[key],
          };
          acc.push(patch);
        }
        return acc;
      }, [] as PatchOperation[]);
      
  
      if (patchArr.length === 0) {
        console.log('No changes detected, no need to save.');
        return; // Early return if no changes
      }
  
      try {
        const response = await fetch(`http://20.207.68.38/hiveconnect/configuration/attributes/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json-patch+json',
            'tenant': 'HC_1', // Assuming 'tenant' is required in your request headers
          },
          body: JSON.stringify(patchArr),
        });
  
        if (response.ok) {
          setSuccess({ show: true, message: 'Attribute saved successfully.' });
      
          setTimeout(() => {
            setSuccess({ show: false, message: '' });
            router.push('/attribute'); // Navigate after the alert is hidden
          }, 2000);
        }
        else {
          const errorData = await response.json(); // Assuming the server returns JSON with an error message
          console.error("Failed to update data:", errorData);
          alert(`Failed to update data: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error while saving data:', error);
      }
    }
  };
  
 

  // Inside handleSave, after setting the alert message
  setTimeout(() => {
    setShowALert(false);
  }, 10000); // Dismiss alert after 5 seconds

  const isFormValid = () => {
    // Assuming all fields are required and should be non-empty
    const requiredFields = [
      'name',
      'groupName',
      'description',
      'dataType',
      'unitOfMeasurement',
      'applicableValues',
    ];

    return requiredFields.every( fieldName => {
      const value = formData[fieldName];
      
       // Check if value is an array
    if (Array.isArray(value)) {
      // Check if any element in the array is empty
      return value.every((item) => item.trim() !== '');
    }
    
      // If the value is a string, check it's not just whitespace
      if (typeof value === 'string') return value.trim() !== '';
      // If the value is anything else (e.g., number), just check it's not null
      return value != null && value !== '';
    });
  };

  useEffect(() => {
    setSaveButtonEnabled(isFormValid());
  }, [formData]);

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
        <Breadcrumbs aria-label="breadcrumb" className="text-dark breadcrumb-text">
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Link href="/attribute" className="text-d-none">
            Attribute Master
          </Link>
          <Typography color="text.primary">Update Attribute</Typography>
        </Breadcrumbs>
        {success.show && (
          <Alert
            className="custom-alert"
            severity="success" 
          >
            {success.message}
          </Alert>
        )}
      </MainHeader>
      <Box className="input-form outletform-box page-padding-container">
        <Box component="div" className="form-body">
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
          >
            <Grid item lg={3} md={3.5} sm={12} xs={12}>
              <Typography component="h3" variant="h3" className="h3">
                Attribute Information
              </Typography>
              <Typography className='p'>
                Attribute Information
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
                <FormControl className="cust-form-control w-100" required variant="filled">
  <InputLabel id="data-type-select-label">Data Type</InputLabel>
  <Select
    labelId="data-type-select-label"
    id="data-type-select"
    value={formData.dataType} // Ensure this matches exactly with MenuItem values
    onChange={handleChange}
    name="dataType"
    error={!!formErrors.dataType}
  >
    <MenuItem value="Text">Text</MenuItem>
    <MenuItem value="Numeric">Numeric</MenuItem>
    <MenuItem value="AlphaNumeric">Alpha-Numeric</MenuItem>
    <MenuItem value="DropDown">Dropdown</MenuItem>
  </Select>
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

export default AttributeUpdate;