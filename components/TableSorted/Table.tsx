// TableComponent.tsx

import React, { useState } from 'react';

 export interface TableComponentProps {
  columns: string[];
}

const Table: React.FC<TableComponentProps> = ({ columns }) => {
  const [data, setData] = useState<string[][]>([[]]);

  const addRow = () => {
    setData(prevData => [...prevData, Array(columns.length).fill('New Data')]);
  };

  const deleteRow = () => {
    if (data.length > 1) {
      setData(prevData => prevData.slice(0, -1));
    } else {
      alert("Cannot delete the last row.");
    }
  };

  return (
    <div>
      <button onClick={addRow}>Add Row</button>
      <button onClick={deleteRow}>Delete Row</button>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
