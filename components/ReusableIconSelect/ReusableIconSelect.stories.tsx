import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ReusableIconSelect, { ReusableSelectProps} from './ReusableIconSelect';

// Meta information for the component
const meta: Meta = {
  title: 'ReusableIconSelect',
  component: ReusableIconSelect,
  argTypes: {
    onChange: { action: 'selected' },
  },
};

export default meta;

// Default story
export const Default: StoryFn<ReusableSelectProps> = (args) => <ReusableIconSelect {...args} />;
Default.args = {
  label: 'Select Options',
  options: [
    { name: 'Option 1', icon: '🌟' },
    { name: 'Option 2', icon: '🚀' },
    { name: 'Option 3', icon: '🎉' },
  ],
  value: [],
  onChange: (selected) => console.log('Selected:', selected),
};

// Story with pre-selected values
export const WithSelectedValues: StoryFn<ReusableSelectProps> = (args) => <ReusableIconSelect {...args} />;
WithSelectedValues.args = {
  ...Default.args,
  value: ['Option 1', 'Option 3'],
};

// Disabled story
export const Disabled: StoryFn<ReusableSelectProps> = (args) => <ReusableIconSelect {...args} />;
Disabled.args = {
  ...Default.args,
  disabled: true,
};
