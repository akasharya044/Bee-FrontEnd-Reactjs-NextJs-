import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import ReusableRadioButton, { ReusableRadioButtonProps } from './ReusableRadioButton';

export default {
  title: 'Example/ReusableRadioButton',
  component: ReusableRadioButton,
} as Meta;

const Template: StoryFn<ReusableRadioButtonProps> = (args) => <ReusableRadioButton {...args} />;

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  onChange: () => {},
  value: 'radio-button-1',
  name: 'radio-group',
  ariaLabel: 'Option 1',
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  ...Checked.args,
  checked: false,
  ariaLabel: 'Option 2',
};
