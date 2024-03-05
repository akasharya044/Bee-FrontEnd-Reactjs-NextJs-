'use client'
import React from 'react';
import WarehouseUpdate from '../../../../hive/pages/warehouseUpdate'

const warehouseUpdate = ({params}:any) => {
 // console.log('param_object',params);
  return (
    <div>
        <WarehouseUpdate wareHouseId = {params.id} />
    </div>
  )
}

export default warehouseUpdate;