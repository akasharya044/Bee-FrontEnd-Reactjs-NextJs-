import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

function createData(projectname: string, servicetype: string, posmtype: string, vendor: string, total: number , allocation: number, recce: string | number) {
  return { projectname, servicetype, posmtype, vendor, total , allocation, recce};
}
  
const rows = [
  createData('3D-4CBS(CUST FULL SHOP)', '-', 'Cust Full Shop', 'Vendor 1', 15, 4, 4),
  createData('Standard Full Shop (Digital /Non Digital) PAN INDIA', '-', 'Cust Full Shop', 'Vendor 2', 217, 217, '-'),
  createData('34 FSU Pan India', '-', 'FSU', '-', 25, 25, '-'),
  createData('Project B', 'Change over', '-', '-', 35, 35, '-'),
];

export default function CustAccordion() {
  return (
    <>
    <CustTable />
    </>
  );
}


function CustTable() {
  return (
        <TableContainer className='table-responsive'>
          <Table className='cust-table' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Active Projects</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>POSM Type</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Allocation</TableCell>
                <TableCell>Recce</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.projectname}
                >
                  <TableCell scope="row"> {row.projectname} </TableCell>
                  <TableCell>{row.servicetype}</TableCell>
                  <TableCell>{row.posmtype}</TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.allocation}</TableCell>
                  <TableCell>{row.recce}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
}


