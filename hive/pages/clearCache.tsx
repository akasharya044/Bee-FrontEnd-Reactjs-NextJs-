// clearCache.tsx

import { SetStateAction } from 'react';

const clearCache = (
  setFormData: {
    (value: any): void;
    (arg0: {
      name: string;
      designation: string;
      department: string;
      contactNo: string;
      email: string;
      country: string;
      city: string;
      state: string;
      address: string;
      pincode: string;
    }): void;
  },
  setCountries: any,
  setState: any,
  setDesignation: any,
  setDepartment: any,
  setResData: { (value: any): void; (arg0: {}): void },
  setFormErrors: {
    (
      value: SetStateAction<{
        name: string;
        designation: string;
        department: string;
        contactNo: string;
        email: string;
        country: string;
        city: string;
        state: string;
        address: string;
        pincode: string;
      }>
    ): void;
    (arg0: {
      name: string;
      designation: string;
      department: string;
      contactNo: string;
      email: string;
      country: string;
      city: string;
      state: string;
      address: string;
      pincode: string;
    }): void;
  }
) => {
  // Resetting the formData to its initial state
  setFormData({
    name: '',
    designation: '',
    department: '',
    contactNo: '',
    email: '',
    country: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
    // other fields if any
  });

  // Reset other states to their initial values
  setCountries([]);
  setState([]);
  setDesignation([]);
  setDepartment([]);
  setResData({});
  setFormErrors({
    name: '',
    designation: '',
    department: '',
    contactNo: '',
    email: '',
    country: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
    // other fields if any
  });

  // Add any additional logic if needed
};

export default clearCache;
