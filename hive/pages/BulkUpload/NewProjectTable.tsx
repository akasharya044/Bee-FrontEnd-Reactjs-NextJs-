'use client';
import React, { useState, useEffect } from 'react';
import UploadButton from '../../../components/UploadButton/UploadButton';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { RiDownloadLine } from 'react-icons/ri';
import { FaFileExport } from 'react-icons/fa';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Tooltip from '@mui/material/Tooltip';
import TableComp2 from './BulkProjectTable';
import { useRouter } from 'next/navigation';
import { ApiService } from '../../../hive/services/api.service';
import * as XLSX from 'xlsx';
import { ListProps } from '../outlet';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Loader } from '../../../components/Loader/Loader';


type NewProjectTableProps = {
  selectedProjectType: string;
  selectedProjectId: any;
  selectedProject: any;
  showTable: boolean;
  selectedProjectTypeName: any;
};

type ColumnConfiguration = {
  id: string;
  name: string;
  isSort: boolean;
  isFilter: boolean;
  isFrozen: boolean;
  isPinned: boolean;
  isVisible: boolean;
};

type ColumnConfigurations = {
  [key: string]: ColumnConfiguration[];
};

const NewProjectTable: React.FC<NewProjectTableProps> = ({
  selectedProjectType,
  selectedProjectId,
  selectedProject,
  showTable,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<number>(0);
  const router = useRouter();
  const apiservice = new ApiService();
  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [data1, setData1] = useState<any[]>([]);
  const [editingRowData, setEditingRowData] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [editingRowId, setEditingRowId] = useState(null);
  console.log('selectedProjectId 35', selectedProjectId);
  const [originalData, setOriginalData] = useState([]);

  // console.log("existing project 40",selectedProject)
  console.log('45 selectedProjectType', selectedProjectType);

  const [showInvalid, setShowInvalid] = useState(false);

  const apiService = new ApiService();

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowInvalid(event.target.checked);
  };

  useEffect(() => {
    setData1(data);
  }, []);


  const columnConfigurations:ColumnConfigurations = {
    '8c351eec-955f-4fe6-3a8d-08dc02c35b13': [
      // { id: '*Sr No', name: 'S.No', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'outletName', name: '*Outlet Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'zone', name: '*Zone', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'city', name: '*City', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'address', name: 'Outlet Address', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'posm', name: '*Product (POSM)', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'entityCode', name: 'Entity Code', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'asm', name: 'ASM', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tme', name: 'TME', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tse', name: 'TSE Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'errorRemarks', name: 'Remarks', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'actions', name: 'Actions', isSort: false, isFilter: false, isFrozen: false, isPinned: false, isVisible: true },
    ],
    '1adf0c1e-cbe7-46fd-3a8e-08dc02c35b13': [
      // { id: '*Sr No', name: 'S.No', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'zone', name: '*Zone', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'city', name: '*City', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'posm', name: '*Product (POSM)', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'quantity', name: 'Quantity', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'asm', name: 'ASM', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tme', name: 'TME', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tse', name: 'TSE Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'errorRemarks', name: 'Remarks', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },

      { id: 'actions', name: 'Actions', isSort: false, isFilter: false, isFrozen: false, isPinned: false, isVisible: true },
    ],
    'ea868ba3-ce2d-4831-3a8f-08dc02c35b13': [
      // { id: '*Sr No', name: 'S.No', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'zone', name: '*Zone', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'city', name: '*City', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'posm', name: '*Product (POSM)', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'quantity', name: 'Quantity', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'asm', name: 'ASM', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tme', name: 'TME', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tse', name: 'TSE Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'remarks', name: 'Remarks', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },

      { id: 'actions', name: 'Actions', isSort: false, isFilter: false, isFrozen: false, isPinned: false, isVisible: true },
    ],
    '433e75eb-9e2b-4567-3a90-08dc02c35b13': [
      // { id: '*Sr No', name: 'S.No', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'zone', name: '*Zone', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'city', name: '*City', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'serviceType', name: 'Service Type', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'outletName', name: '*Outlet Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'outletaddress', name:'Outlet Address', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'asm', name: 'ASM Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tme', name: 'TME Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'tse', name: 'TSE Name', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'errorRemarks', name: 'Remarks', isSort: true, isFilter: true, isFrozen: false, isPinned: false, isVisible: true },
      { id: 'actions', name: 'Actions', isSort: false, isFilter: false, isFrozen: false, isPinned: false, isVisible: true },
    ],
  };

  const setColumnHeaders = (type:any) => {
    const configuration = columnConfigurations[type];
    if (configuration) {
      setColumn(configuration);
    } else {
      console.error('No column configuration found for project type:', type);
    }
  };


const handleFileSelectupload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file || (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls'))) {
        alert('Please select a valid Excel file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const uploadUrl = isFileUploaded
          ? `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/upload/${selectedProject.id}?isReUpload=true`
          : `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/upload/${selectedProject.id}`;

        const response = await apiservice.postData(uploadUrl, formData);

        alert('File uploaded successfully');
        setData(response.data); 
        setIsFileUploaded(true);
    } catch (error) {
        alert('Failed to upload file');
    }
};
 

  const getExistingProject = async () => {
    setIsLoading(true);
    try {
      const response = await apiservice.fetchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/${selectedProject.id}/true?valid=true`
      );
      if (response && response.data && response.data.list) {
        let filteredData = response.data.list;
        if (showInvalid) {
          filteredData = filteredData.filter(
            (item: { isValid: any }) => !item.isValid
          );
        }
    
        // const headers =
        //   filteredData.length > 0
        //     ? [
        //         ...Object.keys(filteredData[0])
        //           .filter(
        //             (key) =>
        //               ![
        //                 'id',
        //                 'isValid',
        //                 'productGroupId',
        //                 'projectType',
        //               ].includes(key)
        //           )
        //           .map((key) => ({
        //             id: key,
        //             name: key.charAt(0).toUpperCase() + key.slice(1),
        //             isSort: true,
        //             isFilter: true,
        //             isFrozen: false,
        //             isPinned: false,
        //             isVisible: true,
        //           })),
        //         {
        //           id: 'actions',
        //           name: 'Actions',
        //           isSort: false,
        //           isFilter: false,
        //           isFrozen: false,
        //           isPinned: false,
        //           isVisible: true,
        //         },
        //       ]
        //     : [];

        //     console.log('206 headers',headers)
   

        // setColumn(headers);
        if (selectedProject && selectedProject.type) {
          setColumnHeaders(selectedProject.type);
        } else {
          console.error('Selected project type or type is undefined');
        }

        setData(filteredData);
        setIsLoading(false);
      }

      // console.log('employee response 102', response);

      // if (newData) {
      //   setData(newData);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProject) {
      getExistingProject();
    }
  }, [selectedProject, showInvalid]);

  const downloadfile = async () => {
    try {
      const response = await apiservice.fetchProjectTypeName(
        `http://4.224.102.99/hiveconnect/requestmanagement/projecttype/${selectedProject.type}`
      );

      const jsonData = JSON.stringify(response.data, null, 2);

      if (
        response.statusCode === 200 &&
        response.data &&
        response.data.fileUrl
      ) {
        const fileUrl = response.data.fileUrl;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = response.data.name || 'download.xlsx';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      } else {
        console.error('File URL not found in the response');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const Exportdata = async () => {
    try {
      const apiUrl = `http://4.224.102.99/hiveconnect/requestmanagement/projectrequest/projectid/${selectedProject.id}`;

      const payload = { tableData: data };

      const response = await apiservice.fetchData(apiUrl, payload);

      if (response && response.data && response.data.validatedUrl) {
        const fileUrl = response.data.validatedUrl;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'DownloadedData.xlsx'; 
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
      } else {
      
        alert('Failed to download Excel file. URL not available.');
      }
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      alert('Failed to download Excel file. Please try again.');
    }
  };

  // const handlePatchBulk = async (index: number, patchData: any) => {
  //   const id = data[index].id; // Get the ID from data using index
  //   const endpoint = `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/${id}`;

  //   try {
  //     const response = await apiservice.patchDataBulk(endpoint, patchData);
  //     if (response.statusCode === 200) {
  //       setData((prevData) =>
  //         prevData.map((item, idx) =>
  //           idx === index ? { ...item, ...editingRowData } : item
  //         )
  //       );
  //       console.log('Success:', response.message);
  //     } else {
  //       console.error('Error:', response.message);
  //     }
  //   } catch (error) {
  //     console.error('API call failed:', error);
  //   }
  // };




  

  const handleProceedClick = async () => {

    const confirmed = window.confirm('Would you like to proceed with validated rows?');

    if (confirmed) {
      try {
        const url = `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/migrate/${selectedProject.id}`;
        const response = await apiservice.postDataBulkuploadProceed(url);
        console.log('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
      
      }
    }
  };


  const handleDelete = async (id: any) => {
    // Display the confirmation dialog
    const isConfirmed = window.confirm("Do you want to delete this row?");
  
    // Proceed with deletion only if the user confirmed
    if (isConfirmed) {
      console.log('Deleting ID:', id);
      const url = `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/${id}`;
  
      const patchData = JSON.stringify([
        {
          op: 'delete',
          path: '/isDeleted',
          value: 'true',
        },
      ]);
  
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json-patch+json',
            'tenant': 'HC_1',
          },
          body: patchData,
        });
  
        if (!response.ok) {
          const errorResponse = await response.text();
          console.error('Server error response:', errorResponse);
          throw new Error('Network response was not ok');
        }
  
        // If deletion was successful, filter out the deleted row from the data
        console.log("Deletion successful for ID:", id);
        setData(currentData => currentData.filter(item => item.id !== id));
        alert("Row has been successfully deleted."); // Optional: Notify the user of successful deletion
      } catch (error) {
        console.error('Failed to delete data:', error);
      }
    } else {
      console.log("Deletion cancelled by user.");
    }
  };
  

  return (
    <>
      <Box className='justifyend' sx={{gap: '12px', mt: '30px'}}>
            {((selectedProjectType === 'New' && isFileUploaded) ||
              selectedProjectType === 'Existing') && (
              <FormControlLabel
                sx={{mr: 0}}
                control={
                  <Switch
                    {...label}
                    checked={showInvalid}
                    onChange={handleToggleChange}
                  />
                }
                label="Show Invalid Data"
              />
            )}

            {selectedProjectType === 'New' && (
              <UploadButton
                onFileSelect={handleFileSelectupload}
                accept="*/*"
                label={isFileUploaded ? 'Re-upload' : 'Upload'}
                buttonStyle={{ padding: '5px 20px' }}
              />
            )}

            {selectedProjectType === 'Existing' && (
              <UploadButton
                onFileSelect={handleFileSelectupload}
                accept="*/*"
                label="Re-Upload"
                buttonStyle={{ padding: '5px 20px' }}
              />
            )}
            {/* {selectedProjectType === 'New' && ( */}
              <Tooltip title="Download Template" placement="top">
                <CustomButton
                  onClick={downloadfile}
                  type="button"className="upload_icon btn btn-outline"
                  sx={{width: '40px !important', padding: '9px !important',  minWidth: 'fit-content'}}
                >
                  <RiDownloadLine style={{ fontSize: '20px' }} />
                </CustomButton>
              </Tooltip>
            {/* )} */}
            <IconButton
              onClick={Exportdata}
              className="upload_icon btn btn-outline"
              sx={{width: 'fit-content !important', padding: '9px !important', minWidth: 'fit-content'}}
            >
              <FaFileExport style={{ fontSize: '20px' }} />
            </IconButton>
          </Box>
          <Typography className='text-error' sx={{textAlign: 'right', mt: '5px'}}>
            Kindly ensure to upload with the latest template
          </Typography>
          <Box sx={{m: '15px 0 10px'}}>
            {selectedProjectType === 'New' && isFileUploaded && (
              <TableComp2
                showDeleteIcon={selectedProjectType === 'New'}
                enableInlineEditing={true}
                isBulkEditing={true}
                data={data}
                setData={setData}
                column2={column}
                setColumn2={setColumn}
                setSearchInput={setSearchInput}
                setSort={setSort}
                sort={sort}
                setFilters={setFilters}
                filters={filters}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                searchInput={searchInput}
                // handlePatch={handlePatchBulk}
                handleDelete={handleDelete}
                editingRowData={editingRowData}
                setEditingRowData={setEditingRowData}
              />
            )}
            {isLoading ? (<Loader />)
            :(
              <>
              {selectedProjectType === 'Existing' && (
                <TableComp2
                  showDeleteIcon={selectedProjectType === 'Existing'}
                  enableInlineEditing={true}
                  isBulkEditing={true}
                  data={data}
                 setData={setData}
                  column2={column}
                  setColumn2={setColumn}
                  setSearchInput={setSearchInput}
                  setSort={setSort}
                  sort={sort}
                  setFilters={setFilters}
                  filters={filters}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  searchInput={searchInput}
                  // handlePatch={handlePatchBulk}
                  handleDelete={handleDelete}
                  editingRowData={editingRowData}
                  setEditingRowData={setEditingRowData}
                />
              )}
              </>
            )}
            
          </Box>
          <Box className='justifyend'>
            <CustomButton
              type="button"
              className="btn btn-black"
              onClick={handleProceedClick}
              // disabled={!isUploadAndReviewClickable}
              >
              Proceed
            </CustomButton>
          </Box>
    </>
  );
};

export default NewProjectTable;