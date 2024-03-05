import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown';


export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    options: { control: 'array' },
  },
} as Meta;

const Template: StoryFn<DropdownProps> = (args: DropdownProps) => <Dropdown {...args} />;

export const Default: StoryFn<DropdownProps> = Template.bind({});
Default.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  onSelect: (selectedOption: string) => {
    console.log(`Selected: ${selectedOption}`);
  },
};
