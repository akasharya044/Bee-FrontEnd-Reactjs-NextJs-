// UploadButton.js
import React, { CSSProperties } from 'react';
import { Button } from '@mui/material';

export interface UploadButtonProps{
  onFileSelect:any,
  accept:any
  label:string
  buttonStyle?: React.CSSProperties;
}

const UploadButton:React.FC<UploadButtonProps> = ({ onFileSelect, accept,label,buttonStyle }) => {
  return (
    <>
      <input
        accept={accept || '*'} 
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        onChange={onFileSelect}
      />
      <label htmlFor="contained-button-file" >
        <Button variant="outlined" className='btn btn-outline' component="span" style={buttonStyle}>
          {label}
        </Button>
      </label>
    </>
  );
};

export default UploadButton;
