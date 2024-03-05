'use client'
import React from 'react';
import EmployeeUpdate from '../../../../hive/pages/employeeUpdate';

const employeeUpdate = ({params}:any) => {
 
  return (
    <div>
        <EmployeeUpdate employeeId = {params.id} />
    </div>
  )
}

export default employeeUpdate;