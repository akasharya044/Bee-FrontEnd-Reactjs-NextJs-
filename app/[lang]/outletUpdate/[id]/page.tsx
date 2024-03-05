import React from 'react';
import OutletUpdate from '../../../../hive/pages/OutletUpdate';

const outletUpdate = ({params}:any) => {

    console.log('params_object',params);

  return (
    <div>
        <OutletUpdate  outletId = {params.id}/>
    </div>
  )
}

export default outletUpdate;