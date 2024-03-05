import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
// import CustomTextField, { CustomTextFieldProps } from '../TextField/TextField';
// import  CustomTextField ,{CustomTextFieldProps}  from '../TextField/TextField';
import { CustomTextField, CustomTextFieldProps } from '../TextField/TextField';



export default {
  component: CustomTextField,
  title: 'Components/CustomTextField',
  argTypes: {
    name: { control: 'text' },
    type: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    placeholder: {control :'text'},
    fullWidth :{control : 'boolean'}
  },
} as Meta;

const Template: StoryFn<CustomTextFieldProps> = (args) => <CustomTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'textField',
  type: 'text',
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: false,
  helperText: '',
  disabled: false,
  label: 'Text Field',
  required: false,
  placeholder:'',
  fullWidth:false
};