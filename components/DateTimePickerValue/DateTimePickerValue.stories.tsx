// DateTimePickerValue.stories.js

import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import DateTimePickerValue, { DateTimePickerValueProps } from './DateTimePickerValue';
// git push
export default {
  title: 'Components/DateTimePickerValue',
  component: DateTimePickerValue,
  argTypes: {
    initialValue: { control: 'date' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<DateTimePickerValueProps> = ({ initialValue, onChange, disabled }) => (
  <DateTimePickerValue initialValue={initialValue} onChange={onChange} disabled={disabled} />
);

export const Basic: StoryFn<DateTimePickerValueProps> = Template.bind({});
Basic.args = {
  initialValue: new Date(),
  onChange: (newValue) => console.log('Date changed:', newValue),
  disabled: false,
};
Basic.storyName = 'Basic DateTimePickerValue';

//export { Meta }; // Export the metadata for documentation purposes
