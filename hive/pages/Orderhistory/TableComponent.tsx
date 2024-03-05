// TableComponent.tsx
import React from 'react';

interface TableProps {
  data: any[]; // You can customize this interface based on your data structure
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  // Get the keys from the first item to use as table headers
  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {headers.map((header, headerIndex) => (
              <td key={headerIndex}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
