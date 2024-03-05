'use client'
import React from 'react';
import VendorUpdate from '../../../../hive/pages/vender/vendorUpdate';

const vendorUpdate = ({params}:any) => {
  return (
    <div>
        <VendorUpdate vendorId = {params.id} />
    </div>
  )
}

export default vendorUpdate;