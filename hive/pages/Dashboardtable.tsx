import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string,
 
) {
  return { name, calories, fat, carbs};
}

const rows = [
    createData('3D-4CBS(CUST FULL SHOP)', '-', '-', '4'),
    createData('Cust Full Shop (Digital /Non Digital) PAN INDIA', '-', '217', '-'),
  ];

export default function Dashboardtable() {
  return (
    <Box className="dashtable-div" >
        <Box className="table-responsive">
        {/* <Table className="dashboard-tbl table-bordered" aria-label="simple table"> */}
        <Table className="cust-table table" aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Active Projects</TableCell>
                <TableCell align="left">Vendor Name</TableCell>
                <TableCell align="right">Allocation</TableCell>
                <TableCell align="right">Recce</TableCell>
            
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
               
                >
                <TableCell  scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Box>
    </Box>
  );
}