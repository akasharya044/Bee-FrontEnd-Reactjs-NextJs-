'use client'
import React from 'react';
import ProductFormUpdate from '../../../../hive/pages/product/productFormUpdate';

const productUpdate = ({params}:any) => {
  return (
    <div>
        <ProductFormUpdate productId = {params} />
    </div>
  )
}

export default productUpdate;