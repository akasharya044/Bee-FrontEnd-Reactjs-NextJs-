import React from 'react';
import AddCategory from '../../../../hive/pages/productManagmentmaster/addcategory';

const page = ({params} :any) => {
  return (
    <div>
      <AddCategory catData={params}/>
    </div>
  );
};

export default page;
