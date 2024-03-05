import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CustomAutocomplete, { AutocompleteProps } from './CustomAutocomplete';

export default {
  title: 'Components/CustomAutocomplete',
  component: CustomAutocomplete,
  argTypes: {
    options: {
      control: 'array',
      defaultValue: ['Option 1', 'Option 2', 'Option 3'],
    },
    label: {
      control: 'text',
      defaultValue: 'Label',
    },
  },
} as Meta;

const Template: StoryFn<AutocompleteProps> = (args) => <CustomAutocomplete {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  label: 'Label',
};
