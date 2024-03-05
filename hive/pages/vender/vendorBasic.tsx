'use client';
import {
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import NewTextField from '../../../components/NewTextField/NewTextField';
import NewSelectOption from '../../../components/NewSelectbox/NewSelectoption';
import { useRouter } from 'next/navigation';
import { ApiService } from '../../services/api.service';
import { headers } from 'next/dist/client/components/headers';


const apiservice = new ApiService();
import { CustomTextField } from '../../../components/TextField/TextField';
import NewSelectAutocomplete from '../../../components/Multselectoption/NewSelectAutocomplete';
// import MultiselectAutocomplete from '../../../components/MultiselectAutocomplete/MultiselectAutocomplete';

// interface VendorBasicProps {
//   setVendor: Dispatch<SetStateAction<boolean>>;
//   updateFormData: (data: object) => void;
// }

export interface VendorBasicProps {
  selectedValue?: any;
  setSelectedValue?: any;
  handleFieldChange?: any;
  formData?: any;
  setFocusedField?: any;
  focusedField?: any;
  activity?: any;
  states?: any;
  countries?: any;
  mode?: string;
  handleSelectChange?: any;
  validationErrors?: any;
  validateField?:any
}

const VendorBasic: React.FC<VendorBasicProps> = ({
  selectedValue,
  handleSelectChange,
  handleFieldChange,

  formData,
  setFocusedField,
  focusedField,
  activity,
  states,
  countries,
  mode,
  validationErrors,
  validateField
}) => {
  const router = useRouter();
  const [column, setColumn] = useState();
  const [data, setData] = useState<any[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // const [selectedValue, setSelectedValue] = useState<any[]>([]);

  const zones = [
    'City A',
    'City B',
    'City C',
    'City D',
    'City E',
    // Add more zones as needed
  ];

  const { countryId, countryId1, state, state1 } = formData;

  if (mode == 'edit') {
    countries?.find((ele: any) => {
      if (ele.name == countryId) {
        formData.countryId = ele.id;
      } else if (ele.name == countryId1) {
        formData.countryId1 = ele.id;
      }
    });

    states &&
      states.find((ele: any) => {
        if (ele.name == state1) {
          formData.state1 = ele.id;
        } else if (ele.name == state) {
          formData.state = ele.id;
        }
      });
  }

  const handleBack = () => {
    router.push('/outlet');
  };

  // const [selectedValue, setSelectedValue] = useState<any[]>([]);
  // const handleSelectChange = (event: any) => {
  //   setSelectedValue(event.target.value);
  // };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  return (
    <>
      <Grid item lg={3} md={3.5} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Basic Information
        </Typography>
        <Typography className='p'>
          Basic information about the Vendor
        </Typography>
      </Grid>
      <Grid item lg={9} md={8.5} sm={12} xs={12}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Name"
              name="name"
              placeholder="Enter Vendor Name"
              value={formData.name}
              required={true}
              onFocus={() => setFocusedField('name')}
              onBlur={handleBlur}
              helperText={validationErrors.name}
              error={!!validationErrors.name}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
        {/* <NewMultiSelectOption
          label={
            <>
              Activity
              <span style={{ color: 'red' }}>*</span>
            </>
          }
          name="activityId"
          placeholder="Select Activity"
          value={formData.activityId}
          onChange={(e) => handleFieldChange(e)}
          options={activity}
          style={{ color: 'blue' }}
          className="my-custom-select"
          onFocus={() => setFocusedField('activityId')}
          // onBlur={() => setFocusedField(null)}
          onBlur={handleBlur}
         
          sx={{ maxWidth: '100%', background: 'white' }}
          helperText={validationErrors.activityId}
          error={!!validationErrors.activityId}
        /> */}

        <NewSelectAutocomplete
          label="Activity"
          name="activityId"
          placeholder="Select Activity"
          // value={activity.filter((act: { id: any; }) => formData.activityId.includes(act.id))}
          // onChange={(event, newValue) => {
          //   const newActivityIds = newValue.map((item: { id: any; }) => item.id);
          //   handleFieldChange({
          //     target: {
          //       name: "activityId",
          //       value: newActivityIds, 
          //     },
          //   });
          // }}

          value={activity.filter((act: { id: any; }) => formData.activityId.includes(act.id))}
          // value={formData.activityId}
          onChange={(event, newValue) => {
            // Map selected activities back to their IDs for formData
            const newActivityIds = newValue.map((item: { id: any; }) => item?.id);
            handleFieldChange({
              target: {
                name: "activityId",
                value: newActivityIds,
              },
            });
          }}
          required={true}
          options={activity}
          sx={{ maxWidth: '100%', background: 'white', color: 'blue' }}
          className="my-custom-select"
          onFocus={() => setFocusedField('activityId')}
          // onBlur={handleBlur}
          // helperText={validationErrors.activityId}
          // error={!!validationErrors.activityId}
        />

      </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomTextField
              label="Legal Entity Name"
              name="legalEntity"
              placeholder="Enter Legal Entity Name"
              value={formData.legalEntity}
              required={true}
              onFocus={() => setFocusedField('legalEntity')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}
              helperText={validationErrors.legalEntity}
              error={!!validationErrors.legalEntity}
              onChange={handleFieldChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid>
      <Grid item lg={3} md={3.5} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Billing and Contact Information
        </Typography>
        <Typography className='p'>
          Billing and Contact details of the vendor
        </Typography>
      </Grid>
      <Grid item lg={9} md={8.5} sm={12} xs={12}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Contact Number"
              name="contactNumber"
              placeholder="Enter Contact Number"
              value={formData.contactNumber}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('contactNumber')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}
              helperText={validationErrors.contactNumber}
              error={!!validationErrors.contactNumber}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Email Address"
              name="emailAddress"
              placeholder="Enter Email Address"
              value={formData.emailAddress}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('emailAddress')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}
              helperText={validationErrors.emailAddress}
              error={!!validationErrors.emailAddress}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="POC Name"
              name="pocName"
              placeholder="Enter POC Name"
              value={formData.pocName}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('pocName')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.pocName}
              error={!!validationErrors.pocName}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="POC Contact Number"
              name="pocContactNumber"
              placeholder="POC Contact Number"
              value={formData.pocContactNumber}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('pocContactNumber')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.pocContactNumber}
              error={!!validationErrors.pocContactNumber}
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
              name="countryId"
              placeholder="Select Country"
              value={formData.countryId}
              onChange={(e) => handleFieldChange(e)}
              options={countries.map((country: any) => ({
                label: country.name,
                value: country.id,
              }))}
              style={{ color: 'blue' }}
              className="my-custom-select"
              // error={!!errors.zone}
              // helperText={errors.zone}
              onFocus={() => setFocusedField('countryId')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.countryId}
              error={!!validationErrors.countryId}
              sx={{ maxWidth: '100%', background: 'white' }}
            />
            {validationErrors.country && (
              <Typography className='error-msg' color="error">{validationErrors.country}</Typography>
            )}
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <NewSelectOption
              label={
                <>
                  State/county
                  <span style={{ color: 'red' }}>*</span>
                </>
              }
              name="state"
              placeholder="Select State/County"
              value={formData.state}
              onChange={(e) => handleFieldChange(e)}
              options={states.map((st: any) => ({
                label: st.name,
                value: st.id,
              }))}
              style={{ color: 'blue' }}
              className="my-custom-select"
              // error={!!errors.zone}
              // helperText={errors.zone}
              onFocus={() => setFocusedField('state')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.state}
              error={!!validationErrors.state}
              sx={{ maxWidth: '100%', background: 'white' }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="City"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              required={true}
              onFocus={() => setFocusedField('city')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.city}
              error={!!validationErrors.city}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Pincode"
              name="pincode1"
              placeholder="Enter Pincode"
              value={formData.pincode1}
              required={true}
              onFocus={() => setFocusedField('pincode1')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.pincode1}
              error={!!validationErrors.pincode1}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <CustomTextField
              label="Billing Address "
              name="billingaddressline1"
              placeholder="Enter Billing Address"
              value={formData.billingaddressline1}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('billingaddressline1')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}
              helperText={validationErrors.billingaddressline1}
              error={!!validationErrors.billingaddressline1}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid>
      <Grid item lg={3} md={3.5} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Business Information Details
        </Typography>
        <Typography className='p'>
          Business information details of the employee
        </Typography>
      </Grid>
      <Grid item lg={9} md={8.5} sm={12} xs={12}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="GST Number"
              name="gstNumber"
              placeholder="Enter GST Number"
              value={formData.gstNumber}
              required={true}
              onChange={handleFieldChange}
              className='text-uppercase'
              onFocus={() => setFocusedField('gstNumber')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.gstNumber}
              error={!!validationErrors.gstNumber}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="PAN No."
              name="panno"
              placeholder="Enter PAN No."
              value={formData.panno}
              onChange={handleFieldChange}
              className='text-uppercase'
              required={true}
              onFocus={() => setFocusedField('panno')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.panno}
              error={!!validationErrors.panno}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="GST Registered Address"
              name="gstregisteredaddressline"
              placeholder="Enter Address Line"
              value={formData.gstregisteredaddressline}
              required={true}
              onChange={handleFieldChange}
              onFocus={() => setFocusedField('gstregisteredaddressline')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.gstregisteredaddressline}
              error={!!validationErrors.gstregisteredaddressline}
            />
          
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="MSME Reg No."
              name="msmeRegNo"
              placeholder="Enter MSME Reg No."
              value={formData.msmeRegNo}
              onChange={handleFieldChange}
              required={true}
              onFocus={() => setFocusedField('msmeRegNo')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.msmeRegNo}
              error={!!validationErrors.msmeRegNo}
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
              name="countryId1"
              placeholder="Select Country"
              value={formData.countryId1}
              onChange={(e) => handleFieldChange(e)}
              options={countries.map((country: any) => ({
                label: country.name,
                value: country.id,
              }))}
              style={{ color: 'blue' }}
              className="my-custom-select"
              // error={!!errors.zone}
              // helperText={errors.zone}
              onFocus={() => setFocusedField('countryId1')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.countryId1}
              error={!!validationErrors.countryId1}
              sx={{ maxWidth: '100%', background: 'white' }}
            />
            {validationErrors.country && (
              <Typography className='error-msg' color="error">{validationErrors.country}</Typography>
            )}
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <NewSelectOption
              label={
                <>
                  State/County
                  <span style={{ color: 'red' }}>*</span>
                </>
              }
              name="state1"
              placeholder="Select State/County"
              value={formData.state1}
              onChange={(e) => handleFieldChange(e)}
              options={states.map((st: any) => ({
                label: st.name,
                value: st.id,
              }))}
              style={{ color: 'blue' }}
              className="my-custom-select"
              // error={!!errors.zone}
              // helperText={errors.zone}
              onFocus={() => setFocusedField('state1')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.state1}
              error={!!validationErrors.state1}
              sx={{ maxWidth: '100%', background: 'white' }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="City"
              name="city1"
              placeholder="Enter City"
              value={formData.city1}
              required={true}
              onFocus={() => setFocusedField('city')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.city1}
              error={!!validationErrors.city1}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Pincode"
              name="pincode"
              placeholder="Enter Pincode"
              value={formData.pincode}
              required={true}
              onFocus={() => setFocusedField('pincode')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}

              helperText={validationErrors.pincode}
              error={!!validationErrors.pincode}
              onChange={handleFieldChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid>

      <Grid item lg={3} md={3.5} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Payment Terms
        </Typography>
        <Typography className='p'>
          Payment terms
        </Typography>
      </Grid>
      <Grid item lg={9} md={8.5} sm={12} xs={12}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="SFA"
              name="sfa"
              placeholder="Enter SFA"
              value={formData.sfa}
              // required={true}
              onFocus={() => setFocusedField('sfa')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}
              helperText={validationErrors.sfa}
              error={!!validationErrors.sfa}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <CustomTextField
              label="Days"
              name="days"
              placeholder="Enter Days"
              value={formData.days}
              // required={true}
              onFocus={() => setFocusedField('days')}
              // onBlur={() => setFocusedField(null)}
              onBlur={handleBlur}
              helperText={validationErrors.days}
              error={!!validationErrors.days}
              onChange={handleFieldChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default VendorBasic;
