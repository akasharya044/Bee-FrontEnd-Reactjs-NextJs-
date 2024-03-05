import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import { Checkbox, IconButton } from '@mui/material';
import { BiSort } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import ListSubheader from '@mui/material/ListSubheader';
// git push

export interface ListCompProps{
    ListArr: any[];
    handleToggle: (value:string) => any
    checked: string[]
    handleColumnSort: (value:any) => void
    handleColumnFilter: (value:any) => void
    label:string
  }
  const ListComp: React.FC<ListCompProps>  = ({ListArr, handleToggle, handleColumnSort, handleColumnFilter, checked, label}) => {
  return (
    <div style={{width:"100%"}}>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',  maxHeight: 300, overflow: 'auto',}}
    subheader={
      <ListSubheader component="div" id="nested-list-subheader" sx={{fontSize: '20px', fontWeight: '600'}}>
        {label}
      </ListSubheader>
    }>
      {ListArr.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <div>
              <IconButton edge="end" aria-label="comments" onClick={() => handleColumnSort(value)} sx={{color: value.isSort? 'lightblue': 'none'}}>
                <BiSort />
              </IconButton>
              <IconButton edge="end" aria-label="comments" sx={{marginLeft: '20px',color: value.isFilter? 'lightblue': 'none'}} onClick={() => handleColumnFilter(value)}>
              <FaFilter />
            </IconButton>
            </div>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value.id)}>
              <ListItemIcon >
                <Checkbox
                  edge="start" 
                  checked={checked.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} style={{ fontWeight: 600,fontSize: "17px", color: "rgba(0, 0, 0, 0.54)" }}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  )
}

export default ListComp