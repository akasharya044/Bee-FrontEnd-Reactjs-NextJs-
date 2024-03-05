
'use client';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  Tooltip,
  Checkbox,
  Typography,
  Popover,
  MenuItem
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Pagination from '../../components/Pagination/Pagination';
import { BiSort } from 'react-icons/bi';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import KeepMountedModal from './CustomModal';
import CustomButton from '../../components/CustomButton/CustomButton';
import ListComp from './ListComp';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { BsFunnel } from 'react-icons/bs';
import EditIcon from '@mui/icons-material/Edit';
import { Loader } from '../../components/Loader/Loader'; 
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
// import { FaSnowflake, FaSun } from 'react-icons/fa';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// import 'react-resizable/css/styles.css';
import FilterPopover from '../../components/Popupfilter/FilterPopover';
import { getDictionary } from '../../getDictionary';
import { useParams } from '../../app/[lang]/ParamContext';
import { ListProps } from './outlet';
import BasicTextFields from './SearchBox';
import EastIcon from '@mui/icons-material/East';


interface DataItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
  pincode: string;
  startDate: string;
  [key: string]: any;
}
interface EditableRowData {
  [key: string]: any; // Replace with your specific row data types
}
export interface TableProps {
  data: any[];
  column2: any[];
  enableInlineEditing?: boolean;
  isBulkEditing?: boolean;
  setColumn2?: React.Dispatch<React.SetStateAction<ListProps[]>>;
  setSearchInput?: React.Dispatch<React.SetStateAction<string>>;
  setData?: React.Dispatch<React.SetStateAction<any[]>>;
  setSort?: React.Dispatch<
    React.SetStateAction<{ field: string; order: string }>
  >;
  sort?: any;
  filters?: object;
  setFilters?: React.Dispatch<React.SetStateAction<Record<any, any>>>;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage?: number;
  setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  deleteRow?: any;
  handlePatch?: (id: any, data: any) => Promise<void> | void;
  searchInput?: string;
  searchFunction?: any;
  Search?: (value: any) => void;
  showDeleteIcon: boolean;
  handleDelete?: (id: any) => void;
  // data1:any[]
  editingRowData?: any;
  setEditingRowData?: any;
  clear?:() =>void;
  fetchData?: () =>void;
  checkBox?: boolean;
  gridName?: string;
  isMore?: boolean;
  serialNo?:boolean;
  children?:React.ReactNode;
  handleAllocation?: (id:string) => void;
  localID?: string;
  loading?: boolean; 
}

function TabPopover(props:any){
  const {actionPopup, anchor, handleClose, id, handleAllocationPath} = props
return (
  <>
    <Popover
      open={id === actionPopup}
      anchorEl={anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        style: { boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)', } // Remove box shadow
      }}
    >
     <MenuItem onClick={() => handleAllocationPath()} ><EastIcon sx={{ marginRight: 1 }} />Allocate Vendor</MenuItem>
     <MenuItem onClick={() => handleClose()}><RemoveRedEyeOutlinedIcon sx={{ marginRight: 1 }}/>View</MenuItem>
    </Popover>
  </>
)
    }

function isNumeric(value: string | any) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

const TableA: React.FC<TableProps> = ({
  loading,
  data,
  setData,
  column2,
  setColumn2,
  setSearchInput,
  setSort,
  sort,
  filters,
  setFilters,
  deleteRow,
  handlePatch,
  searchInput,
  searchFunction,
  showDeleteIcon,
  enableInlineEditing = false,
  isBulkEditing = false,
  handleDelete,
  editingRowData,
  setEditingRowData,
  clear,
  fetchData,
  checkBox,
  gridName,
  isMore,
  serialNo,
  children,
  handleAllocation,
  localID
  // data1
}) => {
  const params = useParams();

  
  const [lang, setLang] = useState<any>(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColumnValue, setSelectedColumnValue] = useState<string>('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [pinnedColumn, setPinnedColumn] = useState(null);
  const [ShowGlobalHeader, setShowGlobalHeader] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [frozenColumns, setFrozenColumns] = useState<string[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [editingData, setEditingData] = useState<any>({}); // Change 'any' to the
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRowId, setDeletingRowId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<DataItem | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [patchData, setPatchData] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [page, setPage] = useState(0); // Start from the first page
  const [rowsPerPage, setRowsPerPage] = useState(10); //
  const indexOfFirstRow = page * rowsPerPage;
  const indexOfLastRow = indexOfFirstRow + rowsPerPage;
  const [selectedParent, setSelectedParent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // for selecting row
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<any[]>([]);



  // const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // const currentRows = Array.isArray(data)
  //   ? data.slice(indexOfFirstRow, indexOfLastRow)
  //   : [];

  const [sortState, setSortState] = useState({ field: null, order: null });
  const [actionPopup,setActionPopup] = useState('');
  // const [filters, setFilters] = useState({});
  
  // Start editing a row
  const startEditingBulk = (id: number, rowData: EditableRowData) => {
    setEditingRowId(id);
    setEditingRowData(rowData);
  };

  // Cancel editing
  const cancelEditingBulk = () => {
    setEditingRowId(null);
    setEditingRowData({});
  };
  const handleInputChangeBulk: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => void = (e, field) => {
    console.log('edited', { ...editingRowData, [field]: e.target.value });
    setEditingRowData({ ...editingRowData, [field]: e.target.value });
  };

  const handleToggle = (value: string, index: any) => () => {
    console.log('toggle>>>', value, index);

    const updatedItems = [...column2];

    // Update the object at the specified index
    updatedItems[index] = { ...updatedItems[index], isVisible: !value };
    setColumn2 && setColumn2(updatedItems);
  };

  console.log('564', column2);
  

  const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getDictionary(params.lang);
      setLang(result);
      setIsLoading(false);
    };

    fetchData();
  }, [params.lang]);
  console.log(lang, 'lang');

  const handleSearch = (searchTerm: string) => {
    //golbal search

    setSearchInput && setSearchInput(searchTerm);
  };

  
  const applyFilter = () => {
    console.log('fildata', {
      ...filters,
      [selectedColumn]: selectedColumnValue,
    });
    setFilters &&
      setFilters({ ...filters, [selectedColumn]: selectedColumnValue });
    setFilterDialogOpen(false);
    setAnchorEl(null);
  };
  const openFilterDialog = (columnId: React.SetStateAction<string>) => {
    setSelectedColumn(columnId);
    setFilterDialogOpen(true);
  };


  const handleSort = (columnId: string) => {
    const newData = [...data];
    const order =
      sort.field === columnId && sort.order === 'asc' ? 'desc' : 'asc';

    newData.sort((a, b) => {
      if (a[columnId] < b[columnId]) return order === 'asc' ? -1 : 1;
      if (a[columnId] > b[columnId]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setSort && setSort({ field: columnId, order });
    setData && setData(newData);
  };

  const handleClick = () => {
    setShowGlobalHeader(!ShowGlobalHeader);
  };

  console.log('sorted column', visibleColumns);

  const handleDateSearch = (fromDate: Date | null, toDate: Date | null) => {
    console.log('date>>>>', fromDate, toDate);

    setFilters &&
      setFilters({ ...filters, fromDate: fromDate, toDate: toDate });
  };

  const handleColumnSort = (value: { id: string; isSort: boolean }) => {
    const updatedData = column2.map((item) => {
      if (item.id === value.id) {
        return {
          ...item,
          isSort: !value.isSort,
        };
      }
      return item;
    });
    setColumn2 && setColumn2(updatedData);
  };

  const handleColumnFilter = (value: { id: string; isFilter: unknown }) => {
    const updatedData = column2.map((item) => {
      if (item.id === value.id) {
        return {
          ...item,
          isFilter: !value.isFilter,
        };
      }
      console.log('item', item);
      return item;
    });
    setColumn2 && setColumn2(updatedData);
    console.log(column2);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(column2);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumn2 && setColumn2(items);
  };


  const startEditing = (id: number, currentData: DataItem) => {
    console.log('patchId', id);
    setEditingRowId(id);
    if (handlePatch) {
      handlePatch(id, data);
    }
    console.log('DataItem', currentData);
    setEditingData(currentData);
  };

  const saveEditing = async (id: number) => {
    if (!editingRowData || Object.keys(editingRowData).length === 0) {
      console.error('No data to edit');
      return;
    }
    console.log('327', id);
    const patchPayload = Object.keys(editingRowData).map((key) => ({
      op: 'replace',
      path: `/${key}`,
      value: editingRowData[key],
    }));
    try {
      if (handlePatch) {
        await handlePatch(id, patchPayload);
        // Optionally, handle any post-save logic here, like refreshing data
      } else {
        console.error('handlePatch function is not provided.');
      }
    } catch (error) {
      // Handle any errors during the save operation
      console.error('Error while saving data:', error);
    }

    // Reset editing state regardless of success or error
    setEditingRowId(null);
    setEditingData({});
  };

  const editingFunction = isBulkEditing ? startEditingBulk : startEditing;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setEditingData({
      ...editingData,
      [id]: e.target.value,
    });

    const updatedFields = { ...editingData, [id]: e.target.value };
    const patchArr: any = [];

    for (const key in updatedFields) {
      if (updatedFields[key] !== editingData[key]) {
        // updatedFields[key] = editingData[key];
        patchArr.push({
          op: 'replace',
          path: `/${key}`,
          value: updatedFields[key],
        });
      }
    }
    console.log('editingData', updatedFields, editingData, e.target.value, id);
    setPatchData(patchArr);
  };

  const openFilterPopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    columnId: string
  ) => {
    setSelectedColumn(columnId);
    setAnchorEl(event.currentTarget);
    console.log('458', event.currentTarget);
  };

  const closeFilterPopover = () => {
    setAnchorEl(null);
  };

  const getTranslation = (key: string, lang: any) => {
    const keys = key.split('.');
    let value = lang;

    for (const k of keys) {
      if (typeof value !== 'object' || value === null) return key; // Ensure value is an object and not null
      value = value[k];
      if (!value) return key; // Fallback to key if not found
    }

    return value;
  };

  const clearAllFilters = () => {
    const clearedFilters: any = {};
    

    filters &&
      Object.keys(filters).forEach((key) => {
        clearedFilters[key] = null;
      });

      setSelectedColumnValue('')
    setFilters && setFilters({});
    setSearchInput && setSearchInput("");
    fetchData && fetchData();
    console.log("ClearFilter",filters)
    // clear && clear();
  };


  const handleCheckboxChange = (row:any) => {
    let newSelectedRows = [...selectedRows];
    const rowIndex = newSelectedRows.indexOf(row.id);

    if (rowIndex === -1 ) {
      if(selectedParent == row.projectTypeId){ 
         newSelectedRows.push(row.id)
      } else { 
        setSelectedParent(row.projectTypeId)
        newSelectedRows = [row.id]
      };

    }else {
      newSelectedRows.splice(rowIndex, 1);
    }
    console.log("selectedParent",selectedParent)
    setSelectedRows(newSelectedRows);
  };

  const isRowSelected = (rowId:any) => selectedRows.includes(rowId.id);

  const toggleRow = (rowId :any) => {
    const newExpandedRows = [...expandedRows];

    if (newExpandedRows.includes(rowId)) {
      // Row is expanded, collapse it
      const rowIndex = newExpandedRows.indexOf(rowId);
      newExpandedRows.splice(rowIndex, 1);
    } else {
      // Row is collapsed, expand it
      newExpandedRows.push(rowId);
    }
    console.log('data>>><<2',newExpandedRows)

    setExpandedRows(newExpandedRows);

    // setData && setData(newExpandedRows);
  };

  const handleExpandClick = (rowId: any) => {
    toggleRow(rowId);
  };

  const handleCollapseClick = (rowId: any) => {
    toggleRow(rowId);
  };

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>,id:string) => {
    setActionPopup(id);
    setAnchor(event.currentTarget);
    };

  const handleClose = () => {
    setActionPopup('');
    setAnchor(null);
  };

  const isRowExpanded = (rowId:any) => expandedRows.includes(rowId);

  const flattenArray = (array:any) => {
    return array.reduce((result:any, item:any) => {

      const value = {
        ...item,
        serviceType : item.serviceType?.name || "",
        vendors : item.vendors?.map((obj:any) => obj.name).join(', ') || "",
        activity: item.activity?.map((obj:any) => obj.name).join(', ') || "",
        lifeCycleStages: item.lifeCycleStages?.map((obj:any) => obj.name).join(', ') || "",
      }
      
      result.push(value);
      if (item.requestDetails && isRowExpanded(item.id)) {
        result.push(...flattenArray(item.requestDetails));
      }

      return result;
    }, []);
  };

  const currentRows = flattenArray(data).slice(indexOfFirstRow, indexOfLastRow);
  console.log("currentRows",currentRows, data)

  //path for vendor Allocation
  const handleAllocationPath = () => {
    // let result = selectedParent +'/' + selectedRows.filter(item => item !== "123").join('/')
    localStorage.setItem(`${localID}`, JSON.stringify(selectedRows));
    handleAllocation && handleAllocation(selectedParent || '')
    // console.log("path>", result)
  }


  return (
    <>
      <Box component="div" className="main-box">
        <Box className="justity-between" sx={{mt: '30px'}}>
          {/* <SearchBox onSearch={handleSearch} /> */}
          <BasicTextFields
            onSearch={handleSearch}
            searchInput={searchInput}
            // searchFunction={() => searchFunction(searchInput)}
            searchFunction={searchFunction}
          />

          <Box>
            <CustomButton
              onClick={clearAllFilters}
              variant="outlined"
              className="button btn-clear"
            >
              <FilterAltOutlinedIcon /> Clear
            </CustomButton>
          </Box>
        </Box>

        {/* Grid Section */}

        <Box
          sx={{
            textAlign: 'center',
            overflowX: 'auto',
            marginTop: '10px',
            width: '100%',
          }}
        >
          <>
          
          {loading ? (
        // Show Loader
        <Loader size={50} />
      ) : currentRows.length === 0 ? (
        // Show message if no data is found
        // <Typography>{`No ${gridName || 'Data'} found!`}</Typography>
        <Typography>{"Sorry no matches. Adjust your search and try again."}</Typography>
      ) : (
            <TableContainer
              sx={{
                maxWidth: '100%',
                height: '100%',
              }}
              className="filter-table table-expand"
            >
              <Box className="table-responsive">
                <Table className="cust-table table">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="columns" direction="horizontal">
                      {(provided) => (
                        <TableHead
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <TableRow className="sticky-head">
                            <TableCell
                              align="left"
                              style={{
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                              }}
                            >
                              {serialNo? 'S.No' : null}
                            </TableCell>

                            {column2?.map((column, index) =>
                              // visibleColumns.includes(column.id)
                              column.isVisible ? (
                                !frozenColumns.includes(column.id) &&
                                column.id !== 'id' &&
                                column.id !== 'actions' ? (
                                  <Draggable
                                    key={column.id}
                                    draggableId={column.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <TableCell
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        key={column.id}
                                        className={
                                          column.id === 'actions'
                                            ? 'actionsColumn'
                                            : column.id === 'id'
                                            ? 'idColumn'
                                            : ''
                                        }
                                        style={{
                                          ...provided.draggableProps.style,
                                          position:
                                            column.id === 'id' ||
                                            column.id === 'actions'
                                              ? 'sticky'
                                              : 'unset',
                                          top: 0,
                                          zIndex: 1,
                                        }}
                                        align="left"
                                      >
                                        <Box className="thDiv">
                                          {column.isSort &&
                                            column.id !== 'actions' && (
                                              <IconButton
                                                onClick={() =>
                                                  handleSort(column.id)
                                                }
                                              >
                                                {sort.field === column.id ? (
                                                  sort.order === 'asc' ? (
                                                    <BiSortUp />
                                                  ) : (
                                                    <BiSortDown />
                                                  )
                                                ) : (
                                                  <BiSort />
                                                )}
                                              </IconButton>
                                            )}

                                          {column.name}
                                          {column.isFilter &&
                                            column.id !== 'actions' && (
                                              <IconButton
                                                onClick={(
                                                  e: React.MouseEvent<
                                                    HTMLButtonElement,
                                                    MouseEvent
                                                  >
                                                ) =>
                                                  openFilterPopover(
                                                    e,
                                                    column.id
                                                  )
                                                }
                                              >
                                                <BsFunnel />
                                              </IconButton>
                                            )}
                                        </Box>
                                      </TableCell>
                                    )}
                                  </Draggable>
                                ) : (
                                  <TableCell
                                    key={column.id}
                                    sx={{
                                      position: 'sticky',
                                      zIndex: 1,
                                      left: column.id === 'id' ? 0 : 'auto',
                                      right:
                                        column.id === 'actions' ? 0 : 'auto',
                                      // backgroundColor: '#fff',
                                    }}
                                  >
                                    {(column.isSort || column.id === 'id') &&
                                      column.id !== 'actions' && (
                                        <IconButton
                                          onClick={() => handleSort(column.id)}
                                        >
                                          {sort.field === column.id ? (
                                            sort.order === 'asc' ? (
                                              <BiSortUp />
                                            ) : (
                                              <BiSortDown />
                                            )
                                          ) : (
                                            <BiSort />
                                          )}
                                        </IconButton>
                                      )}
                                    {column.name}

                                    {(column.isFilter || column.id === 'id') &&
                                      column.id !== 'actions' && (
                                        <IconButton
                                          onClick={(
                                            e: React.MouseEvent<
                                              HTMLButtonElement,
                                              MouseEvent
                                            >
                                          ) => openFilterPopover(e, column.id)}
                                        >
                                          <BsFunnel />
                                        </IconButton>
                                      )}
                                  </TableCell>
                                )
                              ) : null
                            )}
                            {provided.placeholder}
                          </TableRow>
                        </TableHead>
                      )}
                    </Droppable>
                    <TableBody>
                      {currentRows.map((row:any, index:number) => (
                        <TableRow key={index}>
                          {/* Serial Number Cell */}
                          <TableCell
                            style={{
                              position: 'sticky',
                              zIndex: 1,
                              left: 0,
                              backgroundColor: '#f8fafc',
                            }}
                          >
                               {page * rowsPerPage + index + 1}
                            {checkBox && (<Checkbox
                                size='small'
                                sx={{
                                  ml:'5px',
                                  '&.Mui-checked': {
                                    color: '#000000',
                                  },
                                }}
                                checked={isRowSelected(row)}
                                onChange={() => handleCheckboxChange(row)}
                            />)}
                            {row.requestDetails && row.requestDetails.length > 0 && (
                                <IconButton onClick={() => handleExpandClick(row.id)}>{isRowExpanded(row.id)? <RemoveIcon /> : <AddIcon />}</IconButton>
                              )}
                              {/* {row.requestDetails && row.requestDetails.length > 0 && (
                                <button onClick={() => handleCollapseClick(row.id)}>-</button>
                              )} */}
                          </TableCell>

                          {/* Data Cells */}
                          {column2?.map((column) =>
                            column.isVisible ? (
                              <TableCell
                                key={column.id}
                                align={
                                  isNumeric(row[column.id]) ? 'left' : 'left'
                                }
                                style={{
                                  position:
                                    column.id === 'id' ||
                                    column.id === 'actions'
                                      ? 'sticky'
                                      : 'unset',
                                  zIndex: 1,
                                  backgroundColor: '#f8fafc',
                                  left: column.id === 'id' ? 0 : 'auto',
                                  right: column.id === 'actions' ? 0 : 'auto',
                                }}
                              >
                                {editingRowId === row.id &&
                                enableInlineEditing ? (
                                  column.id !== 'actions' ? (
                                    // Editable Input Field
                                    <TextField
                                      fullWidth
                                      value={editingRowData[column.id] || ''}
                                      onChange={(e) =>
                                        handleInputChangeBulk(e, column.id)
                                      }
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: '8px' }}
                                    />
                                  ) : (
                                    // Save and Cancel Buttons for Editable Row
                                    <>
                                      <IconButton
                                        onClick={() => saveEditing(row.id)}
                                        size='small'
                                      >
                                        <SaveIcon />
                                      </IconButton>
                                      <IconButton onClick={cancelEditingBulk} size='small'>
                                        <CancelIcon />
                                      </IconButton>
                                    </>
                                  )
                                ) : column.id === 'actions' ? (( isMore ? (
                                  <>
                                    <IconButton
                                      className="edit-button"
                                      onClick={(e) => handleClickOpen(e, row.id)}
                                    >
                                      <MoreHorizIcon />
                                    </IconButton>
                                    <TabPopover id={row.id} actionPopup={actionPopup} handleClose={handleClose} anchor={anchor} handleAllocationPath={handleAllocationPath}/>
                                    {/* <Popover
                                      open={row.id === actionPopup}
                                      anchorEl={anchor}
                                      onClose={handleClose}
                                      anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                      }}
                                      transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                      }}
                                      PaperProps={{
                                        style: { boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)', } // Remove box shadow
                                      }}
                                    >
                                     <MenuItem onClick={handleAllocationPath} ><EastIcon sx={{ marginRight: 1 }} />Allocate Vendor</MenuItem>
                                    <MenuItem onClick={() => handleClose()}><RemoveRedEyeOutlinedIcon sx={{ marginRight: 1 }}/>View</MenuItem>
                                    </Popover> */}
                                  </>) : (<>
                                    <IconButton
                                      className="edit-button"
                                      onClick={() =>
                                        editingFunction(row.id, row)
                                      }
                                    >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton
                                      className="view-button"
                                      onClick={() => {
                                        setSelectedUser(row);
                                        setViewModalOpen(true);
                                      }}
                                    >
                                      {/* <VisibilityIcon /> */}
                                    </IconButton>
                                    {showDeleteIcon && (
                                      <IconButton
                                        className="delete-button"
                                        onClick={() =>
                                          handleDelete && handleDelete(row.id)
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                  </>))) : //  Cell Content
                                lang ? (
                                  row[column.id]?.length > 15 ? (
                                    <Tooltip
                                      title={row[column.id]}
                                      arrow
                                      placement="top"
                                    >
                                      <span>{`${row[column.id]?.substring(
                                        0,
                                        15
                                      )}...`}</span>
                                    </Tooltip>
                                  ) : (
                                    row[column.id]
                                  )
                                ) : (
                                  row[column.id]
                                )}
                              </TableCell>
                            ) : null
                          )}
                        </TableRow>
                      ))}
                    </TableBody>

                    <Dialog
                      className="user-modal"
                      open={viewModalOpen}
                      onClose={() => setViewModalOpen(false)}
                    >
                      <DialogTitle className="centered-title">
                        {lang ? lang.form.userinfo : 'Loading...'}
                      </DialogTitle>

                      <DialogContent>
                        {selectedUser ? (
                          <Box>
                            <p>
                              <strong>
                                {getTranslation('form.Id', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.id}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Name', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {getTranslation(
                                `form.${selectedUser.name}`,
                                lang
                              ) || selectedUser.name}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Email', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.email}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Phone', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.phone}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Address', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {getTranslation(
                                `form.${selectedUser.address}`,
                                lang
                              ) || selectedUser.address}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.Designation', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {getTranslation(
                                `form.${selectedUser.designation}`,
                                lang
                              ) || selectedUser.designation}
                            </p>
                            <p>
                              <strong>
                                {getTranslation('form.pincode', lang) ||
                                  'Loading...'}
                                :
                              </strong>{' '}
                              {selectedUser.pincode}
                            </p>
                            {/* Add more fields as needed */}
                          </Box>
                        ) : null}
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setViewModalOpen(false)}
                          color="primary"
                        >
                          {lang ? lang.form.close : 'Loading...'}
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={deleteDialogOpen}
                      onClose={() => setDeleteDialogOpen(false)}
                    >
                      <DialogTitle>
                        {' '}
                        {getTranslation('form.ConfirmDelete', lang)}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          {lang ? lang.form.Delete : 'Loading...'}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setDeleteDialogOpen(false)}
                          color="primary"
                        >
                          {lang ? lang.form.cancel : 'Loading...'}
                        </Button>
                        <Button
                          onClick={() => {
                            if (deletingRowId !== null) {
                              deleteRow(deletingRowId);
                              setDeleteDialogOpen(false);
                            }
                          }}
                          color="primary"
                        >
                          {lang ? lang.form.Yes : 'Loading...'}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </DragDropContext>
                </Table>
              </Box>
              <Pagination
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                totalCount={data?.length}
              />
            </TableContainer>)}
          </>

          <Dialog
            open={pinnedColumn !== null}
            onClose={() => setPinnedColumn(null)}
          >
            <DialogActions>
              <Button onClick={() => setPinnedColumn(null)}>
                {' '}
                {lang ? lang.form.cancel : 'Loading...'}
              </Button>
            </DialogActions>
          </Dialog>

          <FilterPopover
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            selectedColumn={selectedColumn}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            filters={filters}
            setFilters={setFilters}
            data={data}
            applyFilter={applyFilter}
            setSelectedColumnValue={setSelectedColumnValue}
            selectedColumnValue={selectedColumnValue}
          />
          <KeepMountedModal open={open} setOpen={setOpen}>
            <ListComp
              ListArr={column2}
              handleColumnSort={handleColumnSort}
              handleColumnFilter={handleColumnFilter}
              handleToggle={handleToggle}
              checked={checked}
              frozenColumns={frozenColumns}
            />
          </KeepMountedModal>
        </Box>
      </Box>
    </>
  );
};

export default TableA;
// function onRowSave(id: string, editingData: any) {
//   throw new Error('Function not implemented.');
// }