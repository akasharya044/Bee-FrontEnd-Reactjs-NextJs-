import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface ReusableButtonProps extends ButtonProps {
  // Define any additional props you want to pass to the Button component
}

const CustomButton: React.FC<ReusableButtonProps> = ({
  children,
  ...props
}) => {
  return <Button {...props}>{children}</Button>;
};

export default CustomButton;
