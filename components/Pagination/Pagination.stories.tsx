import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Pagination from './Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
} as Meta;

const Template: StoryFn = (args) => <Pagination page={0} onPageChange={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number): void {
    throw new Error('Function not implemented.');
} } rowsPerPage={0} onRowsPerPageChange={function (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    throw new Error('Function not implemented.');
} } totalCount={0} {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const LargePageSize = Template.bind({});
LargePageSize.args = {
  pageSizeOptions: [10, 20, 50],
  initialPageSize: 20,
};

export const SmallPageSize = Template.bind({});
SmallPageSize.args = {
  pageSizeOptions: [5, 10, 15],
  initialPageSize: 5,
};
