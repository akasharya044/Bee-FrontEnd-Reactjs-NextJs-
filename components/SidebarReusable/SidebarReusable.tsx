import React, { useState } from 'react'; 
import Button, { ButtonProps } from '@mui/material/Button'; 
import ListComp  from '../../components/List/List'; 
import Pagination from '../../components/Pagination/Pagination'; 
import  DateTimePickerValue from '../../components/DateTimePickerValue/DateTimePickerValue';
import KeepMountedModal from '../../components/CustomModal/CustomModal';
import ReusableIconSelect from '../../components/ReusableIconSelect/ReusableIconSelect' ; 
import Dropdown from '../../components/Dropdown/Dropdown';
import CustomButtom from '../../components/CustomButton/CustomButton' ;

export interface ReusableButtonProps extends ButtonProps {
  showContent?: boolean;
}   
// git push

const CustomButton: React.FC<ReusableButtonProps> = ({
  children,
  showContent,
  ...props
}) => {
  const [isContentVisible, setIsContentVisible] = useState(!!showContent);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div>
      <Button {...props} onClick={toggleContentVisibility}>
        {children}
      </Button>
      {isContentVisible && (
        <div>
          <p>This is the additional content.</p>
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isPaginationVisible, setIsPaginationVisible] = useState(false);
  const [isListCompVisible, setIsListCompVisible] = useState(false);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isKeepMountedModalVisible, setIsKeepMountedModalVisible] =
    useState(false);
  const [isCustomButtonVisible, setIsCustomButtonVisible] = useState(false);
  const [isIconSelectVisible, setIsIconSelectVisible] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleDropdownOptionClick = (option: string) => {
    if (option === 'Dropdown') {
      setIsDropdownVisible(!isDropdownVisible);
      setIsPaginationVisible(false);
      setIsListCompVisible(false);
      setIsDateTimePickerVisible(false);
      setIsKeepMountedModalVisible(false);
      setIsCustomButtonVisible(false);
      setIsIconSelectVisible(false); // Hide the icon select
    } else {
      setIsDropdownVisible(false);
    }
  };

  const showPagination = () => {
    setIsPaginationVisible(true);
    setIsDropdownVisible(false);
    setIsListCompVisible(false);
    setIsDateTimePickerVisible(false);
    setIsKeepMountedModalVisible(false);
    setIsCustomButtonVisible(false);
    setIsIconSelectVisible(false); // Hide the icon select
  };

  const showListComp = () => {
    setIsListCompVisible(true);
    setIsDropdownVisible(false);
    setIsPaginationVisible(false);
    setIsDateTimePickerVisible(false);
    setIsKeepMountedModalVisible(false);
    setIsCustomButtonVisible(false);
    setIsIconSelectVisible(false); // Hide the icon select
  };

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
    setIsDropdownVisible(false);
    setIsPaginationVisible(false);
    setIsListCompVisible(false);
    setIsKeepMountedModalVisible(false);
    setIsCustomButtonVisible(false);
    setIsIconSelectVisible(false); // Hide the icon select
  };

  const showKeepMountedModal = () => {
    setIsKeepMountedModalVisible(true);
    setIsDropdownVisible(false);
    setIsPaginationVisible(false);
    setIsListCompVisible(false);
    setIsDateTimePickerVisible(false);
    setIsCustomButtonVisible(false);
    setIsIconSelectVisible(false); // Hide the icon select
  };

  const showCustomButtonContent = () => {
    setIsCustomButtonVisible(!isCustomButtonVisible);
    setIsDropdownVisible(false);
    setIsPaginationVisible(false);
    setIsListCompVisible(false);
    setIsDateTimePickerVisible(false);
    setIsKeepMountedModalVisible(false);
    setIsIconSelectVisible(false); // Hide the icon select
  };

  const showIconSelect = () => {
    setIsIconSelectVisible(true);
    setIsDropdownVisible(false);
    setIsPaginationVisible(false);
    setIsListCompVisible(false);
    setIsDateTimePickerVisible(false);
    setIsKeepMountedModalVisible(false);
    setIsCustomButtonVisible(false);
  };

  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <div className="parent_div" style={{ display: "flex",
  justifyContent:" space-between"}}>
      <div className="sidebar_button" style={{display:"inline-grid"}}>
        <button
          className="sidebar_button"
          onClick={() => handleDropdownOptionClick('Dropdown')}
        >
          Dropdown
        </button>
        <button className="sidebar_button" onClick={showPagination}>
          Pagination
        </button>
        <button className="sidebar_button" onClick={showListComp}>
          ListComp
        </button>
        <button className="sidebar_button" onClick={showDateTimePicker}>
          DateTimePickerValue
        </button>
        <button className="sidebar_button" onClick={showKeepMountedModal}>
          Modal
        </button>
        <button
          className="sidebar_button"
          onClick={showCustomButtonContent}
        >
          CustomButton
        </button>
        <button className="sidebar_button" onClick={showIconSelect}>
          Icon Select
        </button>
        
      </div>
      <div>
      {isDropdownVisible && (
        <div className="dropdown-container">
          <Dropdown
            options={['Option 1', 'Option 2', 'Option 3']}
            onSelect={(selectedOption: string) => {
              console.log(`Selected: ${selectedOption}`);
              setIsDropdownVisible(false);
            }}
          />
        </div>
      )}
      {isPaginationVisible && (
        <div className="pagination_container">
          <Pagination
            page={0}
            onPageChange={(event, newPage) =>
              console.log('Page changed:', newPage)
            }
            rowsPerPage={10}
            onRowsPerPageChange={(event) =>
              console.log('Rows per page changed:', event.target.value)
            }
            totalCount={100}
          />
        </div>
      )}
      {isListCompVisible && (
        <div className="listcomp_container">
          <ListComp
            ListArr={[
              { id: '1', name: 'Item 1', isSort: false, isFilter: false },
              { id: '2', name: 'Item 2', isSort: false, isFilter: false },
            ]}
            handleToggle={(value) => console.log('Toggle', value)}
            handleColumnSort={(value) => console.log('Sort', value)}
            handleColumnFilter={(value) => console.log('Filter', value)}
            checked={[]}
            label="List Header"
          />
        </div>
      )}
      {isDateTimePickerVisible && (
        <div className="datetimepicker_container">
          <DateTimePickerValue
            initialValue={new Date()}
            onChange={(newValue) => console.log('Date changed:', newValue)}
            disabled={false}
          />
        </div>
      )}
      {isKeepMountedModalVisible && (
        <div className="keepmountedmodal_container">
          <KeepMountedModal
            open={isKeepMountedModalVisible}
            setOpen={setIsKeepMountedModalVisible}
          >
            <h2 id="keep-mounted-modal-title">Modal Title</h2>
            <p id="keep-mounted-modal-description">Modal Content</p>
          </KeepMountedModal>
        </div>
      )}
      {/* {isCustomButtonVisible && (
        <div className="custom_button_container">
          <CustomButton children="Toggle Content" showContent={false} /> 
        </div>
      )} */}   


      {/* changed custom button code  */}

      {isCustomButtonVisible && (
  <div className="custom_button_container">
    <CustomButton showContent={false}>
      Toggle Content
    </CustomButton>
  </div>
)}



      {isIconSelectVisible && (
        <div className="icon_select">
          <ReusableIconSelect
            label="Select Options"
            options={[
              { name: 'Option 1', icon: '🌟' },
              { name: 'Option 2', icon: '🚀' },
              { name: 'Option 3', icon: '🎉' },
            ]}
            value={selectedOptions}
            onChange={setSelectedOptions}
            disabled={false}
          />
        </div>
      )}
      </div>
      </div>
      {/* <div>
      {isDropdownVisible && (
        <div className="dropdown-container">
          <Dropdown
            options={['Option 1', 'Option 2', 'Option 3']}
            onSelect={(selectedOption: string) => {
              console.log(`Selected: ${selectedOption}`);
              setIsDropdownVisible(false);
            }}
          />
        </div>
      )}
      {isPaginationVisible && (
        <div className={pagination_container}>
          <Pagination
            page={0}
            onPageChange={(event, newPage) =>
              console.log('Page changed:', newPage)
            }
            rowsPerPage={10}
            onRowsPerPageChange={(event) =>
              console.log('Rows per page changed:', event.target.value)
            }
            totalCount={100}
          />
        </div>
      )}
      {isListCompVisible && (
        <div className={listcomp_container}>
          <ListComp
            ListArr={[
              { id: '1', name: 'Item 1', isSort: false, isFilter: false },
              { id: '2', name: 'Item 2', isSort: false, isFilter: false },
            ]}
            handleToggle={(value) => console.log('Toggle', value)}
            handleColumnSort={(value) => console.log('Sort', value)}
            handleColumnFilter={(value) => console.log('Filter', value)}
            checked={[]}
            label="List Header"
          />
        </div>
      )}
      {isDateTimePickerVisible && (
        <div className={datetimepicker_container}>
          <DateTimePickerValue
            initialValue={new Date()}
            onChange={(newValue) => console.log('Date changed:', newValue)}
            disabled={false}
          />
        </div>
      )}
      {isKeepMountedModalVisible && (
        <div className={keepmountedmodal_container}>
          <KeepMountedModal
            open={isKeepMountedModalVisible}
            setOpen={setIsKeepMountedModalVisible}
          >
            <h2 id="keep-mounted-modal-title">Modal Title</h2>
            <p id="keep-mounted-modal-description">Modal Content</p>
          </KeepMountedModal>
        </div>
      )}
      {isCustomButtonVisible && (
        <div className={custom_button_container}>
          <CustomButton children="Toggle Content" showContent={false} />
        </div>
      )}
      {isIconSelectVisible && (
        <div className={icon_select}>
          <ReusableIconSelect
            label="Select Options"
            options={[
              { name: 'Option 1', icon: '🌟' },
              { name: 'Option 2', icon: '🚀' },
              { name: 'Option 3', icon: '🎉' },
            ]}
            value={selectedOptions}
            onChange={setSelectedOptions}
            disabled={false}
          />
        </div>
      )}
      </div> */}
    </div>
  );
};

export default Sidebar;
