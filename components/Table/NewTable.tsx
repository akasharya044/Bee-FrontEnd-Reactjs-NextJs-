
import React, { useCallback, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTableProps,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Checkbox,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export type Api = {
  apiname: string;
  baseurl: string;
  route: string;
  bodyparam: string; 
  method: string;
};

export interface TableProps {
  tableType: 'User' | 'Checker' | 'ApiForm';
}

const usStates = ['option1', 'option2', 'option3'];
const method = ['get', 'post', 'put', 'delete'];

const Example: React.FC<TableProps> = ({ tableType }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Api[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ [cellId: string]: string }>({});
  const [columns, setColumns] = useState<MRT_ColumnDef<Api>[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>({});

  const handleCreateNewRow = (values: Api) => { 
    
    setTableData([...tableData, values]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Api>['onEditingRowSave'] = async ({
    exitEditingMode,
    row,
    values,
  }) => {
    if (!Object.keys(validationErrors).length) {
      const updatedTableData = [...tableData];
      updatedTableData[row.index] = values;

      setTableData(updatedTableData);

      exitEditingMode();
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Api>) => {
      if (!window.confirm(`Are you sure you want to delete ${row.getValue('apiname')}`)) {
        return;
      }

      const updatedTableData = [...tableData];
      updatedTableData.splice(row.index, 1);
      setTableData(updatedTableData);
    },
    [tableData],
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<Api>): MRT_ColumnDef<Api>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const handleAddColumn = () => {
    const newColumn: MRT_ColumnDef<Api> = {
      accessorKey: `newColumn${columns.length + 1}`,
      header: `New Column ${columns.length + 1}`,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
    };

    setColumns([...columns, newColumn]);

    const updatedTableData = tableData.map((row) => ({
      ...row,
      [newColumn.accessorKey as string]: 'DefaultValue',
    }));

    setTableData(updatedTableData);

    // Set the default visibility of the new column to true
    setColumnVisibility({
      ...columnVisibility,
      [newColumn.accessorKey as string]: true,
    });
  };

  const handleToggleColumnVisibility = (columnKey: string) => {
    setColumnVisibility({
      ...columnVisibility,
      [columnKey]: !columnVisibility[columnKey],
    });
  };

  const validateRequired = (value: string) => !!value.length;

  const columnsData = useMemo<MRT_ColumnDef<Api>[]>(
    () => [
      ...columns,
      {
        accessorKey: 'column1',
        header: 'Column 1',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'column2',
        header: 'Column 2',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'column3',
        header: 'Column 3',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'route',
        }),
      },
      {
        accessorKey: 'column4',
        header: 'Column 4',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'column5',
        header: 'Column 5',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // Add new columns with visibility toggle
      ...columns.map((column) => ({
        ...column,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }: { cell: MRT_Cell<Api> }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        muiTableHeadCellProps: {
          // Add checkbox for column visibility toggle
          children: (
            <Checkbox
              checked={columnVisibility[column.accessorKey || '']}
              onChange={() => column.accessorKey && handleToggleColumnVisibility(column.accessorKey)}
            />
          ),
        },
      })),
    ],
    [getCommonEditTextFieldProps, columns, columnVisibility],
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        columns={columnsData}
        data={tableData}
        editingMode="modal"
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />

      <Button variant="contained" color="primary" onClick={() => setCreateModalOpen(true)}>
        Add API
      </Button>

      <Button variant="contained" color="primary" onClick={handleAddColumn}>
        Add Column
      </Button>

      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <DialogTitle>Create New Row</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="API Name"
              fullWidth
              variant="outlined"
              select
              required
              helperText={validationErrors['apiname']}
              error={!!validationErrors['apiname']}
              onChange={(e) => handleCreateNewRow({ ...tableData[0], apiname: e.target.value })}
            >
              {usStates.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Base URL"
              fullWidth
              variant="outlined"
              required
              helperText={validationErrors['baseurl']}
              error={!!validationErrors['baseurl']}
              onChange={(e) => handleCreateNewRow({ ...tableData[0], baseurl: e.target.value })}
            />

            <TextField
              label="Route"
              fullWidth
              variant="outlined"
              required
              helperText={validationErrors['route']}
              error={!!validationErrors['route']}
              onChange={(e) => handleCreateNewRow({ ...tableData[0], route: e.target.value })}
            />

            <TextField
              label="Method"
              fullWidth
              variant="outlined"
              select
              required
              helperText={validationErrors['method']}
              error={!!validationErrors['method']}
              onChange={(e) => handleCreateNewRow({ ...tableData[0], method: e.target.value })}
            >
              {method.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Body Parameter"
              fullWidth
              variant="outlined"
              required
              helperText={validationErrors['bodyparam']}
              error={!!validationErrors['bodyparam']}
              onChange={(e) => handleCreateNewRow({ ...tableData[0], bodyparam: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setCreateModalOpen(false)} color="primary">
            Add Row
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Example;
