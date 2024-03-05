// TableComponent.stories.tsx

import React from 'react';
import { Meta,  StoryFn } from '@storybook/react';
import Table , {TableComponentProps} from './Table';

const columns = ['Column 1', 'Column 2', 'Column 3']; // Add more columns if needed

const meta: Meta = {
  title: 'Table',
  component: Table,
  argTypes: {
    columns: { control: { disable: true } }, // Disable the columns control in the Storybook UI
  },
};

export default meta;

const Template: StoryFn<TableComponentProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns,
};
