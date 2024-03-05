import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Typography,
  IconButton,
  FormControlLabel,
  Box,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CustomButton from '../../components/CustomButton/CustomButton';

export interface AccordionItem {
  id: string;
  name: string;
  subActivity?: any[];
  isChecked: boolean;
}

export interface AccordionListProps {
  accordianTitle: AccordionItem[];
  setAccordiantitle: any;
  onSelectedIdsChange:any;
}

const CustomAccordian: React.FC<AccordionListProps> = ({
  accordianTitle,
  setAccordiantitle,
  onSelectedIdsChange,
}) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([]);
  const [selectedTitleIds, setSelectedTitleIds] = useState<string[]>([]);
  const [selectedSubActivityIds, setSelectedSubActivityIds] = useState<string[]>([]);
  

  useEffect(() => {
    const selectedTitles: string[] = [];
    const selectedSubActivities: string[] = [];
    accordianTitle.forEach((accordion) => {
      if (accordion.isChecked) {
        selectedTitles.push(accordion.id);
        if (accordion.subActivity) {
          accordion.subActivity.forEach((sub) => {
            if (sub.isChecked) {
              selectedSubActivities.push(sub.actId);
            }
          });
        }
      }
    });
    onSelectedIdsChange(selectedTitles, selectedSubActivities);
  }, [accordianTitle, onSelectedIdsChange]);

  const handleCheckboxChangeAll = () => {
    const updatedAccordions = accordianTitle.map((accordion) => ({
      ...accordion,
      isChecked: !selectAllChecked,
      subActivity: accordion?.subActivity?.map((sub) => ({
        ...sub,
        isChecked: !selectAllChecked,
      })),
    }));
    setAccordiantitle(updatedAccordions);
    setSelectAllChecked(!selectAllChecked);
  };

  const handleAccordionCheckboxChange = (index: number) => {
    const updatedAccordions = [...accordianTitle];
    updatedAccordions[index].isChecked = !updatedAccordions[index].isChecked;
    updatedAccordions[index].subActivity?.forEach((sub) => {
      sub.isChecked = updatedAccordions[index].isChecked;
    });
    setAccordiantitle(updatedAccordions);
  };

  const handleSubActivityCheckboxChange = (accordionIndex: number, subActivityIndex: number) => {
    const updatedAccordions = [...accordianTitle];
  
    const accordion = updatedAccordions[accordionIndex] as AccordionItem | undefined;
    if (accordion && accordion.subActivity) {
      const subActivity = accordion.subActivity[subActivityIndex] as any;
      if (subActivity) {
        subActivity.isChecked = !subActivity.isChecked;
      }
    }
  
    // If all subactivities of the accordion are checked, update the accordion's isChecked state to true
    const allSubActivitiesChecked = accordion?.subActivity?.every(sub => sub.isChecked);
    if (accordion) {
      accordion.isChecked = !!allSubActivitiesChecked;
    }
  
    setAccordiantitle(updatedAccordions);
  };
  
  

  const handleAccordionExpandChange = (index: number, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedAccordions((prevExpanded) => [...prevExpanded, index]);
    } else {
      setExpandedAccordions((prevExpanded) =>
        prevExpanded.filter((item) => item !== index)
      );
    }
  };

  const handleLogSelectedIds = () => {
    console.log('Selected Title IDs:', selectedTitleIds);
    console.log('Selected SubActivity IDs:', selectedSubActivityIds);
  };

  return (
    <Box className="cust-accordian bg-black">
      <FormControlLabel
        control={
          <Checkbox
            checked={selectAllChecked}
            onClick={(e) => e.stopPropagation()}
            onChange={handleCheckboxChangeAll}
            size="small"
            sx={{color: '#ffffff',
              '&.Mui-checked': {
                color: '#ffffff',
              },
            }}
          />
        }
        label="Select All"
        className="accordian-box"
      />
      {accordianTitle.map((accordion, index) => (
        <Accordion
          key={index}
          expanded={expandedAccordions.includes(index)}
          onChange={(_, isExpanded) =>
            handleAccordionExpandChange(index, isExpanded)
          }
        >
          <AccordionSummary className="accordian-box">
            <IconButton
              size='small'
              onClick={() => handleAccordionCheckboxChange(index)}
              onMouseDown={(e) => e.stopPropagation()} // Prevents the checkbox change when clicking the IconButton
            >
              {expandedAccordions.includes(index) ? <RemoveIcon /> : <AddIcon />}
            </IconButton>

            <Checkbox
              checked={accordion.isChecked}
              onChange={() => handleAccordionCheckboxChange(index)}
              size="small"
              onClick={(e) => e.stopPropagation()}
              sx={{color: '#ffffff',
                '&.Mui-checked': {
                  color: '#ffffff',
                },
              }}
            />
            <Typography>{accordion.name}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={1} sx={{paddingLeft: "30px"}}>
              {accordion.subActivity?.map((sub, subIndex) => (
                <Grid item lg={3} md={4} sm={6}
                  key={subIndex}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sub.isChecked}
                        onChange={() => handleSubActivityCheckboxChange(index, subIndex)}
                        size="small"
                        sx={{color: '#000000',
                          '&.Mui-checked': {
                            color: '#000000',
                          },
                        }}
                      />
                    }
                    label={sub.actName}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CustomAccordian;
