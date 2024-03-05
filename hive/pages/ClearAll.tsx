import { Button } from '@mui/material';
import React, { FC, ReactElement } from 'react';

interface ClearAllProps {
  clearAll: () => void; // Assuming clearAll is a function that returns void
}

const ClearAll: FC<ClearAllProps> = ({ clearAll }): ReactElement => {
  return (
    <div>
      <Button variant="outlined" onClick={clearAll}>Clear filter/sort</Button>
    </div>
  );
};

export default ClearAll;
