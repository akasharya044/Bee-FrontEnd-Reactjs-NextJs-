
import React, { useState } from 'react';
import TabComponent from './TabComponent';
import TableComponent from './TableComponent';

const Home: React.FC = () => {
  const dataForTab1 = [
    { id: 1, name: 'Item 1', price: 10.99 },
    { id: 2, name: 'Item 2', price: 19.99 },
    // Add more data as needed for Tab 1
  ];

  const dataForTab2 = [
    { id: 3, name: 'Product A', stock: 15 },
    { id: 4, name: 'Product B', stock: 8 },
    // Add more data as needed for Tab 2
  ];

  const dataForTab3 = [
    { id: 101, title: 'Post 1', author: 'John Doe' },
    { id: 102, title: 'Post 2', author: 'Jane Smith' },
    // Add more data as needed for Tab 3
  ];

  const tabs = [
    {
      label: 'Tab 1',
      content: (
        <>
          {generateRadioButtons(5)}
          <TableComponent data={dataForTab1} />
        </>
      ),
    },
    {
      label: 'Tab 2',
      content: (
        <>
          {generateRadioButtons(5)}
          <TableComponent data={dataForTab2} />
        </>
      ),
    },
    {
      label: 'Tab 3',
      content: (
        <>
          {generateRadioButtons(5)}
          <TableComponent data={dataForTab3} />
        </>
      ),
    },
  ];

  return (
    <div className="App">
      <h1>Tab Component Example</h1>
      <TabComponent tabs={tabs} />
    </div>
  );
};

// Helper function to generate radio buttons
// const generateRadioButtons = (count: number) => {
//   const radioButtons = [];
//   for (let i = 1; i <= count; i++) {
//     radioButtons.push(
//       <div key={i} className="flex items-center mr-4">
//         <input
//           id={`bordered-radio-${i}`}
//           type="radio"
//           value=""
//           name="bordered-radio"
//           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//         />
//         <label
//           htmlFor={`bordered-radio-${i}`}
//           className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//         >{`Radio ${i}`}</label>
//       </div>
//     );
//   }
//   return <div className="flex">{radioButtons}</div>;
// };


const generateRadioButtons = (count: number): JSX.Element => {
  const radioButtons: JSX.Element[] = []; // Explicit type annotation
  for (let i = 1; i <= count; i++) {
    radioButtons.push(
      <div key={i.toString()} className="flex items-center mr-4">
        <input
          id={`bordered-radio-${i}`}
          type="radio"
          value=""
          name="bordered-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`bordered-radio-${i}`}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{`Radio ${i}`}</label>
      </div>
    );
  }
  return <div className="flex">{radioButtons}</div>;
};

export default Home;
