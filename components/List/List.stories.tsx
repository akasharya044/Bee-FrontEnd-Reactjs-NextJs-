import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ListComp, { ListCompProps } from './List';

export default {
  title: 'ListComp',
  component: ListComp,
} as Meta;
// git push
const Template: StoryFn<ListCompProps> = (args) => <ListComp {...args} />;

export const Default = Template.bind({});
Default.args = {
  ListArr: [
    { id: '1', name: 'Item 1', isSort: false, isFilter: false },
    { id: '2', name: 'Item 2', isSort: false, isFilter: false },
    // Add more items as needed
  ],
  handleToggle: (value) => console.log('Toggle', value),
  handleColumnSort: (value) => console.log('Sort', value),
  handleColumnFilter: (value) => console.log('Filter', value),
  checked: [],
  label: 'List Header',
};
