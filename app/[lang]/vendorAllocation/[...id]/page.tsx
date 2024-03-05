import React from 'react';
import VendorAllocation from '../../../../hive/pages/vendorAllocation';

const page = ({params}:any) => {
  console.log("params>>", params)
  return (
    <div>
        <VendorAllocation params={params}/>
    </div>
  )
}

export default page;