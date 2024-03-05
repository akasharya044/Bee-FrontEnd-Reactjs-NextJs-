'use client';
import { useEffect, useState} from "react";
import { ApiService } from "../services/api.service";
import { useRouter } from "next/router";  // Correct import statement for useRouter
import MainLayout from "./MainLayout";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const EmailTemplate = () => {
  const [projects, setProjects] = useState([]);
  const apiservice = new ApiService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiservice.fetchData('http://4.224.102.99/hiveconnect/requestmanagement/activity');
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }


  };

  return (
    <>
      <MainLayout>
        <h1>Request Mangement Activity</h1>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ParentId</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>ProjectTypeId</TableCell>
                <TableCell>ProjectTypeName</TableCell>
                <TableCell>ServiceTypeId</TableCell>
                <TableCell>ServiceTypeName</TableCell>
                <TableCell>EmailTemplateId</TableCell>
                <TableCell>LifeCycleStorageId</TableCell>
                <TableCell>LifeCycleStorageName</TableCell>
                <TableCell>Cause</TableCell>
                <TableCell>Mandatory</TableCell>
                <TableCell>gsaApplicable</TableCell>
                <TableCell>quantityReq</TableCell>
                <TableCell>ProjectTypeSlug</TableCell>
                {/* Add more headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.parentId}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.projectType.id}</TableCell>
                  <TableCell>{project.projectType.name}</TableCell>
                   <TableCell>{project.serviceType.id}</TableCell>
                   <TableCell>{project.serviceType.name}</TableCell>
                   <TableCell>{project.emailTemplateId}</TableCell>
                   <TableCell>{project.lifeCycleStage.id}</TableCell>
                   <TableCell>{project.lifeCycleStage.name}</TableCell>
                   <TableCell>{project.causes}</TableCell>
                   <TableCell>{project.mandatory}</TableCell>
                   <TableCell>{project.gsaApplicable}</TableCell>
                   <TableCell>{project.quantityReq}</TableCell>
                   <TableCell>{project.projectTypeSlug}</TableCell>
                   <TableCell></TableCell>
                  
                  {/* Add more cells as needed */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainLayout>
    </>
  );
};

export default EmailTemplate;
