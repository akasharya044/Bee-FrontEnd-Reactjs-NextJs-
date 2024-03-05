import React, { ChangeEvent, useState } from 'react';
import NewSelectOption, {
  NewSelectOptionProps,
} from '../../components/NewSelectbox/NewSelectoption';
import { Grid, Typography } from '@mui/material';
import { CustomTextField } from '../../components/TextField/TextField';
import { z } from 'zod';

export interface AddressProps {
  handleFieldChange?: any;
  formData?: any;
  setFocusedField?: any;
  focusedField?: any;
  countries?: any;
  states?: any;
  errors: Record<string, string>;
  validateField: (name: string, value: string) => string;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  schema?: typeof addressSchema;
}
export const addressSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z
    .string()
    .min(1, 'City is required')
    .regex(/^[a-zA-Z\s\-]+$/, 'Invalid city'),
  pincode: z
    .string()
    .min(1, 'Pincode is required')
    .regex(/^\d{5}$/, 'Invalid pincode'),
  address: z.string().min(1, 'Address is required'),
});

const Address: React.FC<AddressProps> = ({
  handleFieldChange,
  formData,
  setFocusedField,
  focusedField,
  states,
  countries,
  errors, // Add this line
  validateField,
  setErrors,
  schema = addressSchema,
}) => {
  const { country, state } = formData;

  console.log('Addresscountry', country, state);

  countries?.find((ele: any) => {
    if (ele.name == country) {
      console.log('is country', ele.name, country);
      formData.country = ele.id;
    }
  });

  states &&
    states.find((ele: any) => {
      if (ele.name == state) {
        console.log('is state', ele.name, state);
        formData.state = ele.id;
      }
    });

  // const modifiedHandleFieldChange = (e: any) => {
  //   const { name, value } = e.target;

  //   // Update formData state
  //   formData[name] = value;

  //   // Perform validation
  //   const error = validateField(name, value);

  //   // Update the errors state using the setErrors prop
  //   setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

  //   // If handleFieldChange prop is provided, call it to update parent component's state
  //   if (handleFieldChange) {
  //     handleFieldChange(e);
  //   }
  // };
  const modifiedHandleFieldChange = (e: any) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    const validationResult = schema.safeParse({ ...formData, [name]: value });

    // if (!validationResult.success) {
    //   const firstError = validationResult.error.flatten().fieldErrors[name]?.[0] || "Invalid field";
    //   setErrors((prevErrors) => ({ ...prevErrors, [name]: firstError }));
    // } else {
    //   const { [name]: removedError, ...restErrors } = errors;
    //   setErrors(restErrors);
    // }

    if (!validationResult.success) {
      const errors = validationResult.error as z.ZodError<{
        [k: string]: string[];
      }>;
      const firstError =
        errors.flatten().fieldErrors[name]?.[0] || 'Invalid field';
      setErrors((prevErrors) => ({ ...prevErrors, [name]: firstError }));
    } else {
      const { [name]: removedError, ...restErrors } = errors;
      setErrors(restErrors);
    }

    // Call handleFieldChange to update the parent state
    handleFieldChange(e);
  };

  return (
    <>
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
            value={formData?.address}
            onChange={modifiedHandleFieldChange}
            required={true}
            onFocus={() => setFocusedField('address')}
            onBlur={() => setFocusedField(null)}
            error={!!errors.address}
            helperText={errors.address || ''}
            fullWidth
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <NewSelectOption
            label={
              <>
                Country
                <span style={{ color: 'red' }}>*</span>
              </>
            }
            name="country"
            value={formData?.country}
            placeholder="Select Country"
            onChange={(e) => {
              const modifiedEvent = {
                target: {
                  name: 'country',
                  value: e.target.value, // Assuming this is the country ID
                },
              };
              modifiedHandleFieldChange(modifiedEvent);
            }}
            options={countries.map((st: any) => ({
              label: st.name,
              value: st.id,
            }))}
            className="my-custom-select"
            onFocus={() => setFocusedField('country')}
            onBlur={() => setFocusedField(null)}
            error={!!errors.country} // Check if there is an error message for the country field
            helperText={errors.country || ''} // Display the error message if it exists
            style={{
              borderRadius: '5px',
              width: '100%',
            }}
            displayEmpty= ""
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <NewSelectOption
            label={<>
              State/County
              <span style={{ color: 'red' }}>*</span>
            </>}
            name="state"
            value={formData?.state}
            placeholder="Select State"
            onChange={(e) => {
              const modifiedEvent = {
                target: {
                  name: 'state',
                  value: e.target.value, // Assuming this is the state ID
                },
              };
              modifiedHandleFieldChange(modifiedEvent);
            } }
            options={states.map((st: any) => ({
              label: st.name,
              value: st.id,
            }))}
            className="my-custom-select"
            onFocus={() => setFocusedField('state')}
            onBlur={() => setFocusedField(null)}
            error={!!errors.state} // Check if there is an error message for the state field
            helperText={errors.state || ''} // Display the error message if it exists
            style={{
              borderRadius: '5px',
              width: '100%',
            }} displayEmpty=""          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <CustomTextField
            name="city"
            label="City"
            placeholder="Enter City"
            value={formData?.city}
            onChange={(e) => {
              // Call the handleFieldChange function with the event
              handleFieldChange(e);
            }}
            required={true}
            onFocus={() => setFocusedField('city')}
            onBlur={() => {
              // When the field loses focus, validate the field
              setErrors((prevErrors) => ({
                ...prevErrors,
                city: validateField('city', formData.city),
              }));
              setFocusedField(null);
            }}
            error={!!errors.city} // Check if there is an error message for the city field
            helperText={errors.city || ''} // Display the error message if it exists
            fullWidth
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <CustomTextField
            name="pincode"
            label="Pincode"
            placeholder="Enter Pincode"
            value={formData?.pincode}
            required={true}
            onChange={(e) => {
              // Call the handleFieldChange function with the event
              handleFieldChange(e);
            }}
            onFocus={() => setFocusedField('pincode')}
            onBlur={() => {
              // When the field loses focus, validate the field
              setErrors((prevErrors) => ({
                ...prevErrors,
                pincode: validateField('pincode', formData.pincode),
              }));
              setFocusedField(null);
            }}
            error={!!errors.pincode} // Check if there is an error message for the pincode field
            helperText={errors.pincode || ''} // Display the error message if it exists
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Address;
