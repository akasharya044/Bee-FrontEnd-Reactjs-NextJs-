import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ReusableSelect, { SelectProps } from './ReusableSelect';

export default {
  title: 'ReusableSelect',
  component: ReusableSelect,
} as Meta;

const Template: StoryFn<SelectProps> = (args) => <ReusableSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Age',
  value: '10',
  onChange: () => {},
  options: [
    { label: 'Ten', value: '10' },
    { label: 'Twenty', value: '20' },
    { label: 'Thirty', value: '30' },
  ],
};
