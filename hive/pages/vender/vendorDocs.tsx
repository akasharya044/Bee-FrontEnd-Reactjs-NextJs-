'use client';
import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Divider, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
export interface VendorDocsProps {
  handleFieldChange?: any;
  formData?: any;
  setFocusedField?: Dispatch<SetStateAction<string | null>>;
  focusedField?: any;
  updateFormData?:any; // Assuming you have a method to update the parent form's state
}

const VendorDocs: React.FC<VendorDocsProps> = ({
  handleFieldChange,
  formData,
  setFocusedField,
  focusedField,
  updateFormData,
}) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);

  const [fileUploadError, setFileUploadError] = useState('');

  const allowedFileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/pdf', // .pdf
    'image/jpeg', // .jpeg
  ];


  const fileToBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
  

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const validFiles: File[] = [];
  //     let invalidFileType = false;
  //     for (let i = 0; i < files.length; i++) {
  //       if (allowedFileTypes.includes(files[i].type)) {
  //         validFiles.push(files[i]);
  //       } else {
  //         invalidFileType = true;
  //       }
  //     }
  //     if (invalidFileType) {
  //       setFileUploadError(
  //         'Invalid file type. Please upload Excel, Word, PDF, or JPEG files.'
  //       );
  //     } else {
  //       setFileUploadError(''); // Clear error message
  //     }
  //     setUploadedDocuments(validFiles);
  //     // Optionally call updateFormData here if you want to immediately update parent state
  //     // updateFormData?.({ uploadedDocuments: validFiles });
  //   }
  // };

  const handleFileChange = async (e: { target: { files: any; }; }) => {
    const files = e.target.files;
    if (files) {
      const validFiles = [];
      const base64Files = [];
      let invalidFileType = false;
      for (let i = 0; i < files.length; i++) {
        if (allowedFileTypes.includes(files[i].type)) {
          validFiles.push(files[i]);
          const base64 = await fileToBase64(files[i]) as string; 
          base64Files.push({
            fileBase64: base64.split(',')[1], 
            fileName: files[i].name,
            extension: files[i].name.split('.').pop(),
          });
        } else {
          invalidFileType = true;
        }
      }
      if (invalidFileType) {
        setFileUploadError('Invalid file type. Please upload Excel, Word, PDF, or JPEG files.');
      } else {
        setFileUploadError('');
      }
      setUploadedDocuments(validFiles);
      updateFormData({ ...formData, vendorDocuments: base64Files }); 
    }
  };
  

  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Divider className="cust-divider" />
      </Grid> 
      <Grid item lg={3} md={3.5} sm={12} xs={12}>
        <Typography component="h3" variant="h3" className="h3">
          Document
        </Typography>
        <Typography className='p'>
          Upload documents
        </Typography>
      </Grid>
      <Grid item lg={9} md={8.5} sm={12} xs={12}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <input
              accept=".xls,.xlsx,.doc,.docx,.pdf,.jpeg"
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }} 
            />
            <Tooltip placement="top" arrow title={uploadedDocuments.map((file) => file.name).join(', ')}>
              <Typography component='label' htmlFor="raised-button-file" className="cust-file-upload">
                <Typography component="span" className={uploadedDocuments.length > 0 ? 'd-none' : 'd-block'}>Upload Document</Typography>
                {uploadedDocuments.length > 0 && (
                  <Typography>
                    <Typography component="span">
                      {uploadedDocuments.map((file) => file.name).join(', ')}
                    </Typography>
                  </Typography>
                )}
                <IconButton size="small" type='button' color="primary" className='cust-upload-btn'>
                  <AttachFileIcon />
                </IconButton>
              </Typography>
            </Tooltip>
            {fileUploadError && (
              <Typography color="error" variant="body2">
                {fileUploadError}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Vendor Docs
        </Button>
      </Grid> */}
    </>
  );
};

export default VendorDocs;
function updateFormData(arg0: { uploadedDocuments: string[] }) {
  throw new Error('Function not implemented.');
}
