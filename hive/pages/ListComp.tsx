import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Checkbox, IconButton } from '@mui/material';
import { BiSort } from 'react-icons/bi';
import { FaFilter, FaSnowflake, FaSun } from 'react-icons/fa';
import { getDictionary } from '../../getDictionary';
import { useParams } from '../../app/[lang]/ParamContext';
import { useEffect, useState } from 'react';

export interface ListCompProps {
  ListArr: any[];
  handleToggle: (value: string, index: number) => any;
  checked: string[];
  handleColumnSort: (value: any) => void;
  handleColumnFilter: (value: any) => void;
  // Assuming columnId is of type string, adjust as needed
  frozenColumns: string[];
}

const ListComp: React.FC<ListCompProps> = ({
  ListArr,
  frozenColumns,

  handleColumnSort,
  handleColumnFilter,
  checked,
}) => {
  const params = useParams();
  const [lang, setLang] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getDictionary(params.lang);
      setLang(result);
      setIsLoading(false);
    };

    fetchData();
  }, [params.lang]);

  const getTranslation = (key: string, lang: any) => {
    if (!lang || !lang.form || !lang.form[key]) return key; // Ensure value is an object and not null
    return lang.form[key];
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        maxHeight: 300,
        overflow: 'auto',
      }}
    >
      {ListArr?.map((value, index) => {
        const labelId = `checkbox-list-label-${value.id}`;
        const translatedName = getTranslation(value.name, lang);
        // Check if the column is 'ID' or 'Action'
        const isIdOrActionColumn = value.name === 'Id';
        const isIdOrActionColumnn = value.name === 'Actions';

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              !isIdOrActionColumnn && (
                // Only render secondary actions for non-ID and non-Action columns
                <div>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleColumnSort(value)}
                    sx={{ color: value.isSort ? 'none' : 'lightblue' }}
                    disabled={isIdOrActionColumn}
                  >
                    <BiSort />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    sx={{
                      marginLeft: '20px',
                      color: value.isFilter ? 'none' : 'lightblue',
                    }}
                    onClick={() => handleColumnFilter(value)}
                    disabled={isIdOrActionColumn}
                  >
                    <FaFilter />
                  </IconButton>
                </div>
              )
            }
            disablePadding
          ></ListItem>
        );
      })}
    </List>
  );
};

export default ListComp;
