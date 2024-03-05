'use client';
import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api.service';
import { ApiService1 } from 'hive/services/api1.service';
import MainLayout from './MainLayout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const RequestManagement = () => {
  const [name, setName] = useState('');
  const [newname , setNewName] = useState('');
    const [projects, setProjects] = useState([]);
const [selname, setselName] = useState('');
const[selnameid , setselNameid] = useState('');
const[dropbox, setdropbox] = useState([]);

  const apiservices = new ApiService();
  const apiservices1 = new ApiService1();

const handleChange = (event: SelectChangeEvent) => {
  const setselName = event.target.value as string;
  
  setselNameid(setselName.id);


  
};

useEffect(() => {
  console.log('patchdatafinal ' + selnameid);
}, [setselNameid]);

const handleidchange = (event:SelectChangeEvent) => {
  setSelnameid(event.target.value);
};

  const [open, setOpen] = React.useState(false);




  const [parentId, setParentId] = useState(null);

  const handleOpen = (id) => {
    console.log('handleopen ' + id);
    setParentId(id); // Use setParentId to update the state
    console.log('patchdata ' + id);
    setOpen(true);
  };

  useEffect(() => {
    console.log('patchdatafinal ' + parentId);
  }, [parentId]);

useEffect(() => {
  // Call newfetch when the component mounts
  newfetch();
}, []);




  const handleClose = () => setOpen(false);

  const handlePostData = async () => {
    try {
      const url =
        'http://4.224.102.99/hiveconnect/requestmanagement/lifecyclestage';
      const data = {
        name: name,
      };

      const response = await apiservices.postData(url, data);

      // Handle the response data as needed
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


  const newfetch = async() =>{

    try{
         
      const url =
        'http://4.224.102.99/hiveconnect/requestmanagement/activity/lookup';
      const newresponse = await apiservices.fetchData(url);
      setdropbox(newresponse.data);

    }
    catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () =>{
    try{
        
      const response = await apiservices.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/lifecyclestage?filter=isdeleted'
      );
    
      setProjects(response.data);

    }
    catch(error){
      console.log(error);
    }
  };


  const patchdata = async () => {
    try {
      console.log('Requesting with id:', parentId);

      const payload = [
        {
          op: 'replace',
          path: '/name',
          value: newname,
          headers: {
            'Content-Type': 'application/json-patch+json',
            tenant: 'HC_1',
          },
        },
      ];

      console.log('Requesting with id:', parentId);
      console.log('New Name:', newname);
      console.log('Payload:', payload);

      const patch = await apiservices1.patchData(
        `http://4.224.102.99/hiveconnect/requestmanagement/lifecyclestage?id=${parentId}`,
        payload
      );

      setNewName(patch.data);

      alert('Record Updated Successfully!');
      
      console.log(patch);
    } catch (error) {
      console.error(error);
    }
  };

const deletedata = async (id) =>{
  try {
    console.log('Requesting with  Delete id:', id);

    const payload = [
      {
        op: 'replace',
        path: '/isdeleted',
        value: true,
        headers: {
          'Content-Type': 'application/json-patch+json',
          tenant: 'HC_1',
        },
      },
    ];

    

    const patch = await apiservices1.patchData(
      `http://4.224.102.99/hiveconnect/requestmanagement/lifecyclestage?id=${id}`,
      payload
    );

    setNewName(patch.data);

    alert('Record Deleted Successfully!');
    
    console.log(patch);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1 style={{ textAlign: 'center' }}>Request Management</h1>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '100ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="name"
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button variant="contained" onClick={handlePostData}>
                Send
              </Button>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell> Edit Data</TableCell>
                      <TableCell> Delete Data</TableCell>

                      {/* Add more headers as needed */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.id}</TableCell>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>
                          <Button
                            className="btn btn-primary"
                            onClick={() => handleOpen(project.id)}
                          >
                            Edit
                          </Button>
                        </TableCell>

                        <TableCell>
                          <Button
                            className="btn btn-primary"
                            onClick={() => deletedata(project.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button variant="contained" onClick={fetchData}>
                GetData
              </Button>

              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selname}
                label="Please Select Name"
                onChange={handleChange}
              >
                {dropbox.map((drop) => (
                  <MenuItem key={drop.id} value={drop}>
                    {drop.name}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                id="selname"
                label="Selected Name"
                variant="standard"
                value={selnameid}
                readOnly // Make the TextField read-only
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please Enter New Name Below
          </Typography>
          <TextField
            id="newname"
            label="New Name"
            variant="standard"
            value={newname}
            onChange={(e) => setNewName(e.target.value)}
          />

          <Button variant="contained" onClick={patchdata}>
            Update
          </Button>
        </Box>
      </Modal>
    </MainLayout>
  );
};

export default RequestManagement;
