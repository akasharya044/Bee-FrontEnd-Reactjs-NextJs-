/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api.service';
import MainLayout from './MainLayout';
import Link from 'next/link';
import CustomAutocomplete from '../../components/CustomAutoComplete/CustomAutocomplete';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Box,
  Divider,
} from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import NewTextField from '../../components/NewTextField/NewTextField';
import CustomAccordian from '../../components/CustomAccordian/CustomAccordian';
import MainHeader from './MainHeader';

const VendorAllocation = ({ params }: any) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    vendor: '',
    quantity: '',
  });

  const [accordianTitle, setAccordiantitle] = useState([]);
  const [table, settableData] = useState<any>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [selectedTitleIds, setSelectedTitleIds] = useState<string[]>([]);
  const [selectedSubActivityIds, setSelectedSubActivityIds] = useState<
    string[]
  >([]);
  const [reqDetails, setReqDetails] = useState<any[]>([]);

  const handleSelectedIdsChange = (
    titleIds: string[],
    subActivityIds: string[]
  ) => {
    setSelectedTitleIds(titleIds);
    setSelectedSubActivityIds(subActivityIds);
  };

  useEffect(() => {
    const storedArrayString = localStorage.getItem('projectId');

    if (storedArrayString !== null) {
      const storedArray = JSON.parse(storedArrayString);
      setReqDetails(storedArray);
      if (params) {
        const updateId = params?.id[0];
        getTableData(storedArray);
        getVendorData();
        getAccordianData(updateId);
      }
    }
  }, [params]);

  const getTableData = async (storedArray: any) => {
    try {
      const apiservice = new ApiService();
      const response = await apiservice.postData(
        'http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/requestdetails',
        storedArray
      );

      if (response.statusCode === 200) {
        settableData(response.data);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };
  const getVendorData = async () => {
    try {
      const apiservice = new ApiService();

      const response = await apiservice.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/vendors`
      );

      const newData = response?.data?.list.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (response.statusCode === 200) {
        setData(newData);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  const getAccordianData = async (updateId: any) => {
    try {
      const apiservice = new ApiService();

      const response = await apiservice.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/activity/subactivities/${updateId}`
      );
      const newData = response?.data?.map((item: any) => ({
        name: item.name,
        id: item.id,
        isChecked: false,
        subActivity: item?.subActivity?.map((sub: any, id: any) => ({
          actName: sub?.name,
          actId: sub?.id,
          isChecked: false,
        })),
      }));
      if (response.statusCode === 200) {
        setAccordiantitle(newData);
      } else {
        console.error('Failed to fetch market IDs');
      }
    } catch (error) {
      console.error('Error fetching market IDs:', error);
    }
  };

  const handleFieldChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleVendorSelect = (vendorId: string | null) => {
    setSelectedVendorId(vendorId);
  };

  const handleSave = async () => {
    const postData: any = [];

    reqDetails.forEach((reqDetail) => {
      selectedSubActivityIds.forEach((subActivityId) => {
        const requestData = {
          requestDetailId: reqDetail,
          /* activityId: reqDetail.activityId, */
          requestOutletId: table?.requestOutlet?.id,
          vendorId: selectedVendorId,
          quantity: formData.quantity,
          activityId: subActivityId
        };

        postData.push(requestData);
      });
    });

    try {
      const apiservice = new ApiService();
      const response = await apiservice.postData(
        'http://4.224.102.99/hiveconnect/requestmanagement/vendorallocation',
        postData
      );

      //console.log('responseee employeee', response);
      if (response.statusCode === 200) {
        // getAccordianData(updateAccId);
      }
      // setShowALert(true);
    } catch (error) {
      console.log('Error while saving data:', error);
      alert(error);
    }
  };


  return (
    <MainLayout>
      <MainHeader
        pageTitle={'Vendor Allocation'}
        // showAlert={showAlert}
        alertMsg={'Your employee has been added to the list.'}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          className="text-dark breadcrumb-text"
        >
          <Link href="/dashboard" className="text-d-none">
            Home
          </Link>
          <Link href="/vendorAllocation" className="text-d-none">
            Vendor Allocation
          </Link>
        </Breadcrumbs>
      </MainHeader>

      <Box className="main-box page-padding-container">
        <TableContainer className="table-responsive" sx={{ mt: '20px' }}>
          <Table className="table cust-table borderedless w-100">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>POSM Type</TableCell>
                <TableCell>Request ID</TableCell>
                <TableCell>Project Type</TableCell>
                <TableCell>No of Outlet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {/* <TableCell>{table.posmType}</TableCell> */}
                {/* <TableCell>{table.requestOutlet.requestId}</TableCell> */}
                <TableCell>{table?.project?.name}</TableCell>
                <TableCell>{table?.posmType}</TableCell>
                <TableCell>{table?.requestOutlet?.requestId}</TableCell>
                <TableCell>{table?.projectTypes?.name}</TableCell>
                <TableCell>{table?.noOfTotalOutlets}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider className="cust-divider" />

        <Box sx={{ mt: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={5} md={6} sm={6} xs={12}>
              <CustomAutocomplete
                options={data}
                label="Vendor"
                onSelect={(vendorId) => handleVendorSelect(vendorId)}
              />
            </Grid>

            {/* Grid item for NewTextField */}
            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
              <NewTextField
                name="quantity"
                placeholder="Enter Quantity"
                value={formData.quantity}
                onChange={(e) => handleFieldChange(e)}
                required={false}
                label="Qty"
                type={undefined}
                className="white-label"
              />
            </Grid>

            <Grid
              item
              xl={6}
              lg={5}
              md={3}
              sm={12}
              xs={12}
              className="justifyend"
            >
              <CustomButton
                // onClick={handleClick}
                className="saveButton btn btn-black"
              >
                Add Vendor
              </CustomButton>
            </Grid>
          </Grid>
          <Divider className="cust-divider" />
          <Box sx={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <CustomAccordian
                accordianTitle={accordianTitle}
                setAccordiantitle={setAccordiantitle}
                onSelectedIdsChange={handleSelectedIdsChange}
              />
            </Grid>
          </Box>
          <Box className="justifyend" sx={{ mt: '20px' }}>
            <CustomButton type="button" className="saveButton btn btn-black" onClick={handleSave}>
              Save
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default VendorAllocation;
