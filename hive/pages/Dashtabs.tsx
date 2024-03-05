/* eslint-disable no-empty */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, ListProps, Paper, SelectChangeEvent, TextField } from '@mui/material';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import CustAccordion from './DashTable';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Autocomplete } from '@mui/material';
import TableA from './TableA';
import { ApiService } from '../../hive/services/api.service';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className=" page-padding-container" sx={{mt: 3}}>
          {children}
        </Box>
      )}
    </div>
  );
}

const dashboardData = {
  dashboard: {
    workCategories: {
      tabs: [
        { name: 'All View', projectCount: 'integer', id: 'allView' },
        { name: "My To Do's", pendingTasksCount: 'integer', id: 'myToDo' },
        { name: 'PMI', pendingTasksCount: 'integer', id: 'Pmi' },
        { name: 'Production', pendingTasksCount: 'integer', id: 'production' },
        { name: 'Services', pendingTasksCount: 'integer', id: 'serviceVendor' },
        { name: 'Finance', pendingTasksCount: 'integer', id: 'finance' },
        { name: 'QC Teams', pendingTasksCount: 'integer', id: 'QcTeams' },
        { name: '3rd Party', pendingTasksCount: 'integer', id: 'partyVendor' },
        { name: 'Digital', pendingTasksCount: 'integer', id: 'digitalVendor' },
      ],
    },
    defaultView: 'All View',
    projectListView: {
      gridView: {
        sortingOption: 'boolean',
        filterIcon: 'boolean',
        clearFilterIcon: 'boolean',
        checkboxesForSelection: 'boolean',
        expandIconForDetails: 'boolean',
        pagination: 'boolean',
      },
    },
  },
};

const dashboardDataVendor = {
  dashboard: {
    workCategories: {
      tabs: [
        { name: 'Recce', projectCount: 'integer', id: 'recce' },
        { name: "Installation", pendingTasksCount: 'integer', id: 'installation' },
        { name: 'QC', pendingTasksCount: 'integer', id: 'qc' },
        { name: 'Configuration', pendingTasksCount: 'integer', id: 'configuration' },
      ],
    },
    defaultView: 'Recce',
    projectListView: {
      gridView: {
        sortingOption: 'boolean',
        filterIcon: 'boolean',
        clearFilterIcon: 'boolean',
        checkboxesForSelection: 'boolean',
        expandIconForDetails: 'boolean',
        pagination: 'boolean',
      },
    },
  },
};


interface Tabs {
  setSetTabs ?: React.Dispatch<React.SetStateAction<string>>;
  setTabs ?: string;
  fetchTabData?: any;
  children?: React.ReactNode
}

const Dashtabs: React.FC<Tabs> = ({ setSetTabs, setTabs, fetchTabData, children }) => {

  const [value, setValue] = React.useState(0);
  const [role, setRole] = useState<any>();

  // React.useEffect(() => {
  //   setRole((typeof window !== 'undefined') ? sessionStorage.getItem("role") : 'terete'); 
  // }, [sessionStorage.getItem("role")]);

  React.useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedRole = sessionStorage.getItem("role");
    setRole(storedRole || 'terete');
  }
});

  const userType: any = role;
  const tabs = (userType == 'Vendor') ? dashboardData.dashboard.workCategories.tabs : dashboardData.dashboard.workCategories.tabs;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const tabName = tabs[newValue]?.id;
    setSetTabs && setSetTabs(tabName);
    fetchTabData(tabName);
  };

  return (
    <Box sx={{ width: '100%' }}>
     
        <CustomTabs labels={tabs.map(tab => tab.name)} value={value} onChange={handleChange} />
        
  
      {tabs.map((tab, index) => (
        <CustomTabPanel key={tab.id} value={value} index={index}>
          {userType === 'Vendor' ? (
            index !== 0 ? children : <CustVendorTable />
          ) : (
            index === 0 ? <CustAccordion />: children
          )}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
export default Dashtabs;

function CustVendorTable() {
  function createData(projectname: string, pending: number, completed: number, review: number, total: number , allocated: number) {
    return { projectname, pending, total, allocated, review , completed};
  }
    
  const rows = [
    createData('3D-4CBS(CUST FULL SHOP)', 12, 3, 4, 1, 4),
    createData('Standard Full Shop (Digital /Non Digital) PAN INDIA', 15 , 4, 3, 4,4),
    createData('34 FSU Pan India', 20,5,6,4,5),
   
  ];

  const [value, setValue] = React.useState(0);
  const [createUser, setCreateUser] = React.useState('');
  // const router = useRouter();

  const [column, setColumn] = useState<ListProps[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [setTabs, setSetTabs] = useState<string>('All View');

  const apiservice = new ApiService();

  interface ListProps {
    id: string;
    name: string; // Adding the 'name' property
    isSort: boolean;
    isFilter: boolean;
    isFrozen: boolean;
    isPinned: boolean;
    isVisible: boolean;
  }
  

  useEffect(() => {
    fetchData();

    // Rest of your useEffect logic
    setColumn([
      // { id: 'id', name: 'Id', isSort: false, isFilter: false, isFrozen: true, isPinned: false, isVisible: true },
      {
        id: 'requestId',
        name: 'Request ID',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'projectName',
        name: 'Project Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'projectTypeName',
        name: 'Project Type',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'posm',
        name: 'Product(POSM)',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'serviceType',
        name: 'Service Type',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'quantity',
        name: 'Quantity',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },

      {
        id: 'zone',
        name: 'Zone',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'city',
        name: 'City',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tme',
        name: 'TME',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'tse',
        name: 'TSE',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'asm',
        name: 'ASM',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'activity',
        name: 'Associated Activity',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'entityCode',
        name: 'Entity Code',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'outletName',
        name: 'Outlet Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'address',
        name: 'Outlet Address',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'vendors',
        name: 'Vendor Name',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'lifeCycleStages',
        name: 'Lifecycle Stage',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'gpsLink',
        name: 'Status',
        isSort: true,
        isFilter: true,
        isFrozen: false,
        isPinned: false,
        isVisible: true,
      },
      {
        id: 'actions',
        name: 'Actions',
        isSort: true,
        isFilter: true,
        isPinned: false,
        isVisible: true,
        isFrozen: false
      },
    ]);
  }, []);

  const searchFunction = async (searchInput: any) => {
    try {
      if (searchInput) {
        const response = await apiservice.fetchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/outlets/filter/${searchInput}`
        );

        const newData = response?.data;
        if (newData) {
          setData(newData);
        }
      } else {
        fetchData();
      }
    } catch (error) {
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiservice.fetchData(
        'http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/dashboardrequestoutlet'
      );

      const newData = response?.data?.requestOutlets?.map((item: any) => ({
        id: item.id,
        requestId: item.requestId,
        projectTypeName: item.projectTypeName,
        projectName: item.projectName,
        quantity: item.requestDetails?.length || '-',
        requestDetails: item.requestDetails,
        projectId: item.projectId,
      }));
      if (newData) {
        setData(newData);
        // alert(JSON.stringify(newData)); // Show data in alert as JSON string
      }
    } catch (error) {
      
    }
  };

  const fetchTabData = useCallback(
    async (tab: any) => {
      if (tab !== 'myToDo') {
        setData([]);
        return;
      }
      try {
        const response = await apiservice.fetchData(
          `http://4.224.102.99/hiveconnect/requestmanagement/requestOutlet/dashboardrequestoutlet?type=${tab}`
        );

        const newData = response?.data?.requestOutlets?.map((item: any) => ({
          id: item.id,
          requestId: item.requestId,
          projectTypeName: item.projectTypeName,
          projectName: item.projectName,
          quantity: item.requestDetails?.length || '-',
          requestDetails: item.requestDetails,
          projectId: item.projectId,
        }));

        if (newData) {
          setData(newData);
         
        }
      } catch (error) {   
      }
    },
    [setTabs]
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCreatUser = (event: SelectChangeEvent) => {
    setCreateUser(event.target.value);
    if (event.target.value == 'Creat') {
      // router.push('/createUser');
    }
  };

  const handleAllocation = (path: string) => {
    // router.push(`/vendorAllocation/${path}`);
  };
  return (<>
        <TableContainer className='table-responsive'>
          <Table className='cust-table' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Active Projects</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Pending for Allocation</TableCell>
                <TableCell>Allocated</TableCell>
                <TableCell>Pending for Review</TableCell>
                <TableCell>Completed</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.projectname}
                >
                  <TableCell scope="row"> {row.projectname} </TableCell>
                  <TableCell>{row.pending}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.allocated}</TableCell>
                  <TableCell>{row.review}</TableCell>
                  <TableCell>{row.completed}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
       
       {/*  <Paper>
          <Autocomplete
            style={{ width: 200 }}
            multiple
            id="multiselect1"
            options={[]}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Associate Activity" />}
          />
        </Paper>
        
        <Paper>
          <Autocomplete
            style={{ width: 200 }}
            multiple
            id="multiselect2"
            options={[]}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Ground Crew" />}
          />
        </Paper> */}
      </Box>
      
      <Box>
      <TableA
          data={data}
          showDeleteIcon
          column2={column}
          setSearchInput={setSearchInput}
          setSort={setSort}
          sort={sort}
          setFilters={setFilters}
          filters={filters}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          // deleteRow={deleteRow}
          // handlePatch={handlePatch}
          searchInput={searchInput}
          searchFunction={searchFunction}
          checkBox={true}
          isMore={true}
          handleAllocation={handleAllocation}
          localID="projectId"
        ></TableA></Box></>
      )
}
