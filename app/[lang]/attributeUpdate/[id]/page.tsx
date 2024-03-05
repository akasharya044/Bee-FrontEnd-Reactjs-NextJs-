'use client'
import React from 'react';
import AttributeUpdate from '../../../../hive/pages/attributeUpdate';

const attributeUpdate = ({params}:any) => {
 
  return (
    <div>
        <AttributeUpdate attributeId = {params.id} />
    </div>
  )
}

export default attributeUpdate;