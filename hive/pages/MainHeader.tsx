import React, { ReactNode } from 'react';
// import Link from 'next/link';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Typography, Alert, Box } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
interface MainHeaderProps {
  pageTitle: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
  showAlert?:boolean;
  alertMsg?: string;
  isAddButton?:boolean
  HeaderText?:string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ pageTitle, buttonLabel, onButtonClick, children, showAlert, alertMsg, isAddButton }) => {
  return (
    <Box className="white-box page-padding-container">
        {children}
      <Box className='alignbaseLine' sx={{justifyContent: 'space-between'}}>
      <Typography component='h3' variant='h3' className='page-heading-text h3 text-black' sx={{mt: '15px'}}>{pageTitle}</Typography>
      {isAddButton && <CustomButton onClick={onButtonClick} className='btn btn-black'>
                          {buttonLabel}
                        </CustomButton>}
        {showAlert && (
              <Alert className='custom-alert' icon={<CheckCircleOutline />} severity="success">
                {alertMsg}
              </Alert>
             )}
      </Box>
    </Box>
  );
};

export default MainHeader;
