'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
// import {CustomTextField} from '../../components/TextField/TextField';
import NewSelectOption from '../../components/NewSelectbox/NewSelectoption';
import NewTextField from '../../components/NewTextField/NewTextField';
// import "../styles"
import ReusableSelect from '../../components/ReusableSelect/ReusableSelect';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Divider } from '@mui/material';
import { Container, CssBaseline, Grid } from '@mui/material';
import MainLayout from './MainLayout';

const CreateUser = () => {
  // const [errors, setErrors] = useState({});
  const countries = [
    'India',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    // Add more countries as needed
  ];

  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    // Add more cities as needed
  ];

  const zones = [
    'Zone A',
    'Zone B',
    'Zone C',
    'Zone D',
    'Zone E',
    // Add more zones as needed
  ];

  const [formData, setFormData] = useState({
    firstName: '', // Add the property names and their initial values
    lastName: '', // for each field in your form.
    role: '',
    email: '',
    permissionLevel: '',
    jobTitle: '',
    address: '',
    city: '',
    country: '',
    zone: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  //   const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  const handleFieldChange = (val: any) => {
    // const { name, value } = e.target;
    setFormData({
      ...formData,
      [val.name]: val.value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const requiredFields: (keyof typeof formData)[] = [
      'firstName',
      'lastName',
      'role',
      'email',
      'jobTitle',
      'address',
      'city',
      'permissionLevel',
      'country',
      'zone',
      'zipCode',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // No errors, you can proceed with saving the data
      // Perform your save logic here
    }
  };

  return (
    <MainLayout>
      <div className="box_shadow">
        <CssBaseline />
        <Box
          bgcolor="#7326d9"
          width="100%"
          height="14vh"
          position="static"
          top="0"
          left="0"
          zIndex={1}
        >
          <Typography
            variant="h6"
            style={{
              color: 'white',
              textAlign: 'left',
              paddingRight: '10px',
              paddingTop: '40px',
              paddingLeft: '20px',
            }}
          >
            Create User
          </Typography>
        </Box>

        <Container
          maxWidth="lg"
          style={{ paddingTop: '50px', background: '#efefef' }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-evenly',
              }}
            >
              <Typography variant="h5" sx={{ margin: '0px 126px 20px 0px' }}>
                Personal Information
              </Typography>
              <Box
                sx={{
                  padding: '20px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '700px', // Adjust the maxWidth as needed
                }}
              >
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <NewTextField
                        label="First Name"
                        placeholder="First Name"
                        sx={{ background: 'white', marginBottom: '15px' }}
                        name="firstName"
                        required={true}
                        className={'imp'}
                        value={formData.firstName}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        onChange={handleFieldChange}
                        error={
                          focusedField === 'firstName' && !formData.firstName
                        }
                        helperText={
                          focusedField === 'firstName' && !formData.firstName
                            ? 'First Name is required'
                            : ''
                        }
                        type={undefined}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NewTextField
                        label="Last Name"
                        placeholder="Last Name"
                        sx={{ background: 'white', marginBottom: '15px' }}
                        name="lastName"
                        required={true}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        className={'imp'}
                        value={formData.lastName}
                        onChange={handleFieldChange}
                        error={
                          focusedField === 'lastName' && !formData.lastName
                        }
                        helperText={
                          focusedField === 'lastName' && !formData.lastName
                            ? 'Last Name is required'
                            : ''
                        }
                        type={undefined}
                      />
                    </Grid>
                  </Grid>

                  <NewTextField
                    label="Email"
                    placeholder="Email"
                    sx={{ background: 'white', marginBottom: '15px' }}
                    required={true}
                    className={'imp'}
                    name="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'email' && !formData.email}
                    helperText={
                      focusedField === 'email' && !formData.email
                        ? 'Email is required'
                        : ''
                    }
                    type={undefined}
                  />
                  <NewTextField
                    label="Job Title"
                    placeholder="Job Title"
                    sx={{ background: 'white', marginBottom: '15px' }}
                    required={true}
                    className={'imp'}
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('jobTitle')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'jobTitle' && !formData.jobTitle}
                    helperText={
                      focusedField === 'jobTitle' && !formData.jobTitle
                        ? 'JobTitle is required'
                        : ''
                    }
                    type={undefined}
                  />

                  <NewTextField
                    label="Role"
                    placeholder="Role"
                    required={true}
                    sx={{ background: 'white', marginBottom: '15px' }}
                    className={'imp'}
                    name="role"
                    value={formData.role}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('role')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'role' && !formData.jobTitle}
                    helperText={
                      focusedField === 'role' && !formData.jobTitle
                        ? 'Role is required'
                        : ''
                    }
                    type={undefined}
                  />

                  <NewTextField
                    label="Permission Level"
                    placeholder="Permission Level"
                    sx={{ background: 'white' }}
                    required={true}
                    className={'imp'}
                    name="permissionLevel"
                    value={formData.permissionLevel}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('permissionLevel')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'role' && !formData.jobTitle}
                    helperText={
                      focusedField === 'role' && !formData.jobTitle
                        ? 'Permission Level is required'
                        : ''
                    }
                    type={undefined}
                  />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Divider sx={{ margin: '20px 0', marginTop: '20px' }} />
        <Container
          maxWidth="lg"
          style={{ paddingTop: '40px', background: '#efefef' }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-evenly',
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Contact Details
              </Typography>
              <Box
                sx={{
                  paddingLeft: '200px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '700px',
                }}
              >
                <Grid item xs={12}>
                  <NewTextField
                    label="Address"
                    placeholder="Address"
                    sx={{ background: 'white', marginBottom: '15px' }}
                    required={true}
                    className={'imp'}
                    name="address"
                    value={formData.address}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'address' && !formData.jobTitle}
                    helperText={
                      focusedField === 'address' && !formData.jobTitle
                        ? 'Address is required'
                        : ''
                    }
                    type={undefined}
                  />

                  <NewSelectOption
                    label={
                      <>
                        Country
                        <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                    name="country"
                    value={formData.country}
                    onChange={(e) =>
                      handleFieldChange({
                        target: { name: 'country', value: e.target.value },
                      })
                    }
                    // options={zones.map((zone) => ({ label: zone, value: zone }))}
                    options={[
                      { label: 'Select a Country', value: '' }, // This is your placeholder option
                      ...countries.map((country) => ({
                        label: country,
                        value: country,
                      })),
                    ]}
                    style={{ color: 'blue', marginBottom: '20px' }}
                    className="my-custom-select"
                    onFocus={() => setFocusedField('country')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'country' && !formData.zone}
                    helperText={
                      focusedField === 'country' && !formData.zone
                        ? 'Country is required'
                        : ''
                    }
                    sx={{ maxWidth: '100%', background: 'white' }}
                  />
                  <NewSelectOption
                    label={
                      <>
                        City
                        <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                    value={formData.city}
                    className="my-custom-select"
                    onChange={(e) =>
                      handleFieldChange({
                        target: { name: 'city', value: e.target.value },
                      })
                    }
                    options={[
                      { label: 'Select a City', value: '' }, // This is your placeholder option
                      ...zones.map((zone) => ({ label: zone, value: zone })),
                    ]}
                    style={{ color: 'blue', marginBottom: '20px' }}
                    onFocus={() => setFocusedField('city')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'city' && !formData.city}
                    helperText={
                      focusedField === 'city' && !formData.zone
                        ? 'City is required'
                        : ''
                    }
                    sx={{ maxWidth: '100%', background: 'white' }}
                  />
                  <NewSelectOption
                    label={
                      <>
                        Zone
                        <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                    name="zone"
                    value={formData.zone}
                    style={{ color: 'blue', marginBottom: '20px' }}
                    onChange={(e) =>
                      handleFieldChange({
                        target: { name: 'zone', value: e.target.value },
                      })
                    }
                    // options={zones.map((zone) => ({ label: zone, value: zone }))}
                    options={[
                      { label: 'Select a zone', value: '' }, // This is your placeholder option
                      ...zones.map((zone) => ({ label: zone, value: zone })),
                    ]}
                    className="my-custom-select"
                    onFocus={() => setFocusedField('zone')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'zone' && !formData.zone}
                    helperText={
                      focusedField === 'zone' && !formData.zone
                        ? 'Zone is required'
                        : ''
                    }
                    sx={{ maxWidth: '100%', background: 'white' }}
                  />

                  <NewTextField
                    label="ZipCode"
                    placeholder="ZipCode"
                    sx={{ background: 'white' }}
                    required={true}
                    fullWidth
                    className={'imp'}
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleFieldChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    error={focusedField === 'zipCode' && !formData.jobTitle}
                    helperText={
                      focusedField === 'zipCode' && !formData.jobTitle
                        ? 'ZipCode is required'
                        : ''
                    }
                    type={undefined}
                  />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Divider sx={{ margin: '20px 0', marginTop: '50px' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '20px',
          }}
        >
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              marginRight: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              color: 'black',
            }}
          >
            Cancel
          </CustomButton>

          <CustomButton
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              marginRight: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              color: 'black',
            }}
          >
            Save and Exit
          </CustomButton>

          <CustomButton
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: 'black',
              border: '2px solid black',
              color: 'white',
            }}
          >
            Save and Continue
          </CustomButton>
        </Box>
      </div>
    </MainLayout>
  );
};

export default CreateUser;
