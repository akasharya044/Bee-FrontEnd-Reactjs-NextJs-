import React, { ChangeEvent } from 'react';
import NewTextField from '../../../components/NewTextField/NewTextField';
import NewSelectOption from '../../../components/NewSelectbox/NewSelectoption';

interface Attribute {
    id: string;
    name: string;
    dataType: number;
    applicableValues: string;
    unitOfMeasurement: string | null;
  }
  
  interface DynamicTableProps {
    attributeData: Attribute[];
  }
  
  const DynamicTable: React.FC<DynamicTableProps> = ({ attributeData }) => {
    function handleFieldChange(event: ChangeEvent<HTMLInputElement>): void {
      throw new Error('Function not implemented.');
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Unit of Measurement</th>
          </tr>
        </thead>
        <tbody>
          {attributeData.map((attribute) => (
            <tr key={attribute.id}>
              <td>{attribute.name}</td>
              <td>
                {attribute.dataType === 3 ? (
                  <NewSelectOption
                    name={attribute.name.toLowerCase()}
                    options={attribute.applicableValues.split(',').map((value) => ({ label: value, value }))}
                    label=""
                    placeholder={`Select ${attribute.name}`}
                    value=""
                    onChange={handleFieldChange} 
                  />
                ) : (
                  <NewTextField
                      name={attribute.name.toLowerCase()}
                      label=""
                      placeholder={`Enter ${attribute.name}`}
                      value=""
                      onChange={handleFieldChange} type={undefined}                  />
                )}
              </td>
              <td>
                <NewTextField
                  name={`unit_${attribute.name.toLowerCase()}`}
                  label=""
                  placeholder="Enter Unit of Measurement"
                  value={attribute.unitOfMeasurement || ''}
                  onChange={handleFieldChange} type={undefined}                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default DynamicTable;