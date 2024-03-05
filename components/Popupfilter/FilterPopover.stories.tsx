import React, { useState } from 'react';
import FilterPopover, { FilterPopoverProps } from './FilterPopover'; // Import your FilterPopover component
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/FilterPopover', // Title for your story
  component: FilterPopover,
  argTypes: {
    anchorEl: { control: 'null' },
    onClose: { action: 'closed' },
    selectedColumn: { control: 'text' },
    selectedOption: { control: 'text' },
    setSelectedOption: { action: 'selectedOptionChanged' },
    filters: { control: 'object' },
    setFilters: { action: 'filtersChanged' },
    data: { control: 'object' },
    applyFilter: { action: 'filterApplied' },
  },
} as Meta;

const Template: StoryFn<FilterPopoverProps> = (args) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div>
      <button onClick={(e) => setAnchorEl(e.currentTarget)}>Open FilterPopover</button>
      <FilterPopover {...args} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  selectedColumn: 'columnName',
  selectedOption: 'start with',
  filters: {},
  data: [{ columnName: 'Option 1' }, { columnName: 'Option 2' }, { columnName: 'Option 3' }],
};
