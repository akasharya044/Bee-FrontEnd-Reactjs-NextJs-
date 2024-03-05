import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CustomButton, {ReusableButtonProps} from './CustomButton';


export default {
  title: 'components/UserButton',
  component: CustomButton,
} as Meta;

const Template: StoryFn<ReusableButtonProps> = (args) => <CustomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    variant: 'contained',
    color: 'primary',
    onClick: () => console.log('Button clicked'),
    children: 'Click Me',
    disabled:true
  };