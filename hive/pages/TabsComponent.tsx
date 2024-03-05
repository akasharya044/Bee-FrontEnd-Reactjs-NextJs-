import React from 'react';
import MainLayout from './MainLayout';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Link from 'next/link';

const Tabscomponent = () => {
  const cardsData = [
    {
      heading: 'ENTITY',
      subheadings: [
        { name: 'ClientEmployee', path: '/employee' },
        { name: 'Vendor', path: '/vendor' },
        { name: 'Outlet', path: '/outlet' },
        { name: 'Warehouse', path: '/warehouse' },
        { name: 'Payment Terms', path: '/paymentTerms' },
        { name: 'Warehouse Type', path: '/warehousetype' },
      ],
    },
    {
      heading: 'ADDRESS',
      subheadings: [
        { name: 'Market', path: '/marketMaster' },
        { name: 'Country', path: '/country' },
        { name: 'Zone', path: '/zone' },
        { name: 'States', path: '/states' },
        { name: 'Cities', path: '/cities' },
        { name: 'Zip Code', path: '/zipcode' },
      ],
    },
    {
      heading: 'DETAILS',
      subheadings: [
        { name: 'User', path: '/user' },
        { name: 'User Permissions', path: '/userpermissions' },
        { name: 'Role', path: '/role' },
        { name: 'Role Permissions', path: '/rolepermissions' },
        { name: 'Logging', path: '/logging' },
        { name: 'Register', path: '/register' },
      ],
    },
    {
      heading: 'REQUESTS',
      subheadings: [
        { name: 'User Contact', path: '/usercontact' },
        { name: 'Contact Type', path: '/contacttype' },
        { name: 'Contact Details', path: '/contactdetails' },
        { name: 'Documents', path: '/documents' },
        { name: 'Documents Types', path: '/documentstypes' },
        { name: 'BulkUpload', path: '/bulkupload' },
      ],
    },
    {
      heading: 'HEADING',
      subheadings: [
        { name: 'Activity', path: '/activity' },
        { name: 'Template', path: '/template' },
        { name: 'Work Flow', path: '/workFlow' },
        { name: 'Configurations', path: '/configurations' },
        { name: 'Emails Configurations', path: '/emailsconfigurations' },
        { name: 'Actions', path: '/actions' },
      ],
    },
    {
      heading: 'Another Heading',
      subheadings: [
        { name: 'ProductManagement', path: '/productManagement' },
        { name: 'Attribute Master', path: '/attribute' },
        { name: 'Module', path: '/module' },
        { name: 'Templates', path: '/template' },
        { name: 'WorkFlow', path: '/workflow' },
        { name: 'Workflow stage', path: '/workflowstage' },
        { name: 'UpdateMigration', path: '/updatemigration' },
      ],
    },
  ];

  return (
    <MainLayout>
      <Grid
        container
        spacing={2}
        sx={{ background: 'white', padding: '25px', borderRadius: '5px' }}
      >
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="black" fontWeight="bold">
                  {card.heading}
                </Typography>
                <Box sx={{ padding: '10px 5px 5px 15px' }}>
                  {card.subheadings.map((subheading, subIndex) => (
                    <Box key={subIndex} sx={{ paddingLeft: '20px' }}>
                      <Link href={subheading.path} passHref>
                        <span
                          style={{
                            textDecoration: 'underline',
                            color: 'black',
                            cursor: 'pointer',
                          }}
                        >
                          {subheading.name}
                        </span>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Tabscomponent;
